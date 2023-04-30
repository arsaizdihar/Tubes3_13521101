import { PrismaClient } from "@prisma/client";

class Tambah {
  private regex = /^Tambah pertanyaan (.+) dengan jawaban (.+)$/i;
  constructor(private db: PrismaClient) {}

  isMatch(input: string) {
    return this.regex.test(input);
  }

  async getResponse(input: string) {
    const match = input.match(this.regex)!;

    // Parse input to qna
    const question = match[1];
    const answer = match[2];

    if (!question || !answer) {
      console.log("Sintaks tidak sesuai");
      return "Sintaks tidak sesuai";
    }

    // check question already exists
    const existingQuestion = await this.db.chatStorage.findFirst({
      where: { question: question.trim() },
    });

    if (existingQuestion) {
      await this.db.chatStorage.update({
        where: { id: existingQuestion.id },
        data: { answer: answer.trim() },
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
