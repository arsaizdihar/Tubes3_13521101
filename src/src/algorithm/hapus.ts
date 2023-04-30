import { PrismaClient, ChatStorage } from "@prisma/client";

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
    const pertanyaan = input.slice(deleteQuestionPrefix.length).trim();

    // Find question in database
    const existingPertanyaan = await this.db.chatStorage.findFirst({ where: { question: pertanyaan } });

    if (!existingPertanyaan) {
      console.log(`Tidak ada pertanyaan ${pertanyaan} pada database`);
      return `Tidak ada pertanyaan ${pertanyaan} pada database`;
    }

    // hapus
    try {
      await this.db.chatStorage.delete({ where: { id: existingPertanyaan.id } });
      console.log(`Pertanyaan ${pertanyaan} telah dihapus`);
      return `Pertanyaan ${pertanyaan} telah dihapus`;
    } catch (error) {
      console.error(error);
      return "Gagal menghapus pertanyaan";
    }
  }
}

export default Hapus;