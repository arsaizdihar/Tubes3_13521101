import { ChatStorage } from "@prisma/client";
import BaseAlgorithm from "./base";
import { StringMatching } from "./string";

export class Question implements BaseAlgorithm {
  private _data: ChatStorage[] = [];
  constructor(private algorithm: "KMP" | "BM") {}

  set data(data: ChatStorage[]) {
    this._data = data;
  }

  getResponse(input: string) {
    if (!this._data.length) {
      return "Tidak mengerti maksud kamu :(";
    }
    let answer: string | null = null;
    const matcher = new StringMatching(this.algorithm, input);
    for (const { question, answer: qans } of this._data) {
      if (matcher.check(question)) {
        answer = qans;
        break;
      }
    }
    if (answer == null) {
      return this.checkLevenstein(input);
    }
    return answer ?? "Tidak mengerti maksud kamu :(";
  }

  checkBM(input: string): string | null {
    for (const { question, answer } of this._data) {
      if (input.length > question.length) return null;
      const last = new Map<number, number>();
      for (let i = 0; i < question.length; i++) {
        last.set(question.charCodeAt(i), i);
      }
      let i = input.length - 1;
      let j = i;
      do {
        if (input.charAt(j) === question.charAt(i)) {
          if (j === 0) {
            return answer;
          }
          i--;
          j--;
        } else {
          const lastOccurance = last.get(input.charCodeAt(i)) ?? -1;
          i = i + input.length - Math.min(j, 1 + lastOccurance);
          j = input.length - 1;
        }
      } while (i <= question.length - 1);
    }
    return null;
  }

  checkLevenstein(input: string) {
    const result: Array<[ChatStorage, number]> = [];
    input = input.toLowerCase();

    for (const q of this._data) {
      const d =
        StringMatching.getLevensteinDistance(q.question.toLowerCase(), input) /
        q.question.length;
      result.push([q, d]);
    }
    // sort by d ascending
    result.sort((a, b) => a[1] - b[1]);
    if (result[0][1] <= 0.1) {
      return result[0][0].answer;
    }
    const strings: string[] = [];
    for (let i = 0; i < result.length && i < 3; i++) {
      strings.push(`${i + 1}. ${result[i][0].question}`);
    }
    return (
      "Pertanyaan tidak ditemukan di database. \nApakah maksud anda:\n" +
      strings.join("\n")
    );
  }

  isMatch(input: string) {
    return true;
  }
}
