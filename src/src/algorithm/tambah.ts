import { ChatStorage, PrismaClient } from "@prisma/client";
import { Calculator } from "./calculator";
import { DateQuestion } from "./date";
import Hapus from "./hapus";
import { StringMatching } from "./string";

class Tambah {
  private regex = /^Tambah(?:kan)? pertanyaan +(.+) dengan jawaban +(.+)$/i;
  private _data: ChatStorage[] = [];
  constructor(
    private db: PrismaClient,
    private algorithm: "KMP" | "BM",
    private calculator: Calculator,
    private date: DateQuestion,
    private hapus: Hapus
  ) {}

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
        `Pertanyaan "${question}" sudah ada! Jawaban diupdate ke "${answer}"`
      );
      return `Pertanyaan "${question}" sudah ada! jawaban diupdate ke "${answer}"`;
    }
    // check if question match other feature other than question
    const checks = [this.calculator, this.date, this.hapus, this];
    if (checks.some((check) => check.isMatch(question))) {
      return `Pertanyaan "${question}" tidak valid karena merupakan bagian dari fitur lain selain pertanyaan.`;
    }

    // Add question and answer to database
    try {
      await this.db.chatStorage.create({
        data: { question: question.trim(), answer: answer.trim() },
      });
      console.log(
        `Pertanyaan "${question}" ditambahkan dengan jawaban "${answer}"`
      );
      return `Pertanyaan "${question}" telah ditambah.`;
    } catch (error) {
      console.error(error);
      return "Gagal menambahkan pertanyaan";
    }
  }
}

export default Tambah;
