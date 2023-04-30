import { PrismaClient } from "@prisma/client";

class Hapus {
  private regex = /^Hapus pertanyaan (.+)/i;
  constructor(private db: PrismaClient) {}

  isMatch(input: string) {
    return this.regex.test(input);
  }

  async getResponse(input: string) {
    // Parse input to question
    const pertanyaan = input.match(this.regex)![1];

    // Find question in database
    const existingPertanyaan = await this.db.chatStorage.findFirst({
      where: { question: pertanyaan },
    });

    if (!existingPertanyaan) {
      console.log(`Tidak ada pertanyaan ${pertanyaan} pada database`);
      return `Tidak ada pertanyaan ${pertanyaan} pada database`;
    }

    // hapus
    try {
      await this.db.chatStorage.delete({
        where: { id: existingPertanyaan.id },
      });
      console.log(`Pertanyaan ${pertanyaan} telah dihapus`);
      return `Pertanyaan ${pertanyaan} telah dihapus`;
    } catch (error) {
      console.error(error);
      return "Gagal menghapus pertanyaan";
    }
  }
}

export default Hapus;
