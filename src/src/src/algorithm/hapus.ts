import { PrismaClient } from "@prisma/client";

class Hapus {
  constructor(private db: PrismaClient) {}

  isMatch(input: string) {
    const deleteQuestionPrefix = "Hapus pertanyaan ";
    return input.toLowerCase().startsWith(deleteQuestionPrefix.toLowerCase());
  }

  async getResponse(input: string) {
    const deleteQuestionPrefix = "Hapus pertanyaan ";
    if (!input.toLowerCase().startsWith(deleteQuestionPrefix.toLowerCase())) {
      console.log("Sintaks tidak sesuai");
      return "Sintaks tidak sesuai";
    }

    // Parse input to question
    const question = input.slice(deleteQuestionPrefix.length).trim();

    // Find question in database
    const existingQuestion = await this.db.question.findFirst({ where: { question: question } });

    if (!existingQuestion) {
      console.log(`Tidak ada pertanyaan ${question} pada database`);
      return `Tidak ada pertanyaan ${question} pada database`;
    }

    // hapus
    try {
      await this.db.question.delete({ where: { id: existingQuestion.id } });
      console.log(`Pertanyaan ${question} telah dihapus`);
      return `Pertanyaan ${question} telah dihapus`;
    } catch (error) {
      console.error(error);
      return "Gagal menghapus pertanyaan";
    }
  }
}

export default Hapus;
