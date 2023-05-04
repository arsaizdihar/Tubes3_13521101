import { ChatStorage, PrismaClient } from "@prisma/client";
import { StringMatching } from "./string";

class Tambah {
  private regex = /^Tambah pertanyaan +(.+) dengan jawaban +(.+)$/i;
  private _data: ChatStorage[] = [];
  constructor(private db: PrismaClient, private algorithm: "KMP" | "BM") {}

  set data(data: ChatStorage[]) {
    this._data = data;
  }

  isMatch(input: string) {
    return this.regex.test(input);
  }

  async getResponse(input: string) {
    const match = input.match(this.regex)!;
  
    // Parse input to qna
    const question = match[1];
    const answer = match[2];
  
    // check question already exists
    let existingQuestion: ChatStorage | null = null;
    const matcher = new StringMatching(this.algorithm, question);
    for (const q of this._data) {
      if (matcher.check(q.question)) {
        existingQuestion = q;
        break;
      }
    }
  
    if (existingQuestion) {
      await this.db.chatStorage.update({
        where: { id: existingQuestion.id },
        data: { answer: answer.trim(), question: question.trim() },
      });
      console.log(
        `Pertanyaan ${question} sudah ada! Jawaban diupdate ke ${answer}`
      );
      return `pertanyaan ${question} sudah ada! jawaban diupdate ke ${answer}`;
    }
  
    // Add question and answer to database
    try {
      await this.db.chatStorage.create({
        data: { question: question.trim(), answer: answer.trim() },
      });
      console.log(
        `Pertanyaan ${question} ditambahkan dengan jawaban ${answer}`
      );
      return "pertanyaan " + question + " telah ditambah";
    } catch (error) {
      console.error(error);
      return "Gagal menambahkan pertanyaan";
    }
  }
  
}

export default Tambah;
