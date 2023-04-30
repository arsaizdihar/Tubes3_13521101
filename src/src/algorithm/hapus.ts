import { ChatStorage, PrismaClient } from "@prisma/client";
import { StringMatching } from "./string";

class Hapus {
  private regex = /^Hapus pertanyaan (.+)/i;
  private _data: ChatStorage[] = [];
  constructor(private db: PrismaClient, private algorithm: "KMP" | "BM") {}

  set data(data: ChatStorage[]) {
    this._data = data;
  }

  isMatch(input: string) {
    return this.regex.test(input);
  }

  async getResponse(input: string) {
    // Parse input to question
    const pertanyaan = input.match(this.regex)![1];
    const lowerPertanyaan = pertanyaan.toLowerCase();

    // Find question in database
    let existingPertanyaan: ChatStorage | null = null;
    const matcher = new StringMatching(this.algorithm, pertanyaan);
    for (const q of this._data) {
      if (matcher.check(q.question)) {
        existingPertanyaan = q;
        break;
      }
    }

    if (!existingPertanyaan) {
      let minDistance: [ChatStorage, number] | null = null;
      for (const q of this._data) {
        const distance =
          StringMatching.getLevensteinDistance(
            lowerPertanyaan,
            q.question.toLowerCase()
          ) / q.question.length;
        if (!minDistance || distance < minDistance[1]) {
          minDistance = [q, distance];
        }
      }
      if (minDistance && minDistance[1] <= 0.1) {
        existingPertanyaan = minDistance[0];
      }
    }

    if (!existingPertanyaan) {
      return `Tidak ada pertanyaan ${pertanyaan} pada database`;
    }

    // hapus
    try {
      await this.db.chatStorage.delete({
        where: { id: existingPertanyaan.id },
      });
      return `Pertanyaan ${pertanyaan} telah dihapus`;
    } catch (error) {
      console.error(error);
      return "Gagal menghapus pertanyaan";
    }
  }
}

export default Hapus;
