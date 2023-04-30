import { ChatStorage } from "@prisma/client";
import BaseAlgorithm from "./base";

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
    if (this.algorithm === "BM") {
      answer = this.checkBM(input);
    } else {
      answer = this.checkKMP(input);
    }
    if (answer == null) {
      return this.checkLevenstein(input);
    }
    return answer ?? "Tidak mengerti maksud kamu :(";
  }

  checkKMP(input: string): string | null {
    // Compute prefix table
    const prefixTable = new Array(input.length).fill(0);

    let i = 0;
    for (let j = 1; j < input.length; j++) {
      while (i > 0 && input.charAt(i) !== input.charAt(j)) {
        i = prefixTable[i - 1];
      }
      if (input.charAt(i) === input.charAt(j)) {
        i++;
      }
      prefixTable[j] = i;
    }

    // Substring Search
    for (const { question, answer } of this._data) {
      let j = 0;
      let k = 0;

      while (j < question.length) {
        if (input.charAt(k) === question.charAt(j)) {
          j++;
          k++;
        }
        if (k === input.length) {
          return answer;
        } else if (
          j < question.length &&
          input.charAt(k) !== question.charAt(j)
        ) {
          if (k !== 0) {
            k = prefixTable[k - 1];
          } else {
            j++;
          }
        }
      }
    }
    return null;
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

    for (const q of this._data) {
      const d =
        this.getLevensteinDistance(q.question, input) / q.question.length;
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

  getLevensteinDistance(a: string, b: string) {
    const m = a.length;
    const n = b.length;
    const d = Array.from<number[], number[]>({ length: m + 1 }, () =>
      new Array(n + 1).fill(0)
    );
    for (let i = 1; i <= m; i++) {
      d[i][0] = i;
    }

    for (let j = 1; j <= n; j++) {
      d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        let substitionCost = 1;
        if (a.charAt(i) === b.charAt(j)) {
          substitionCost = 0;
        }

        d[i][j] = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + substitionCost
        );
      }
    }
    return d[m][n];
  }

  isMatch(input: string) {
    return true;
  }
}
