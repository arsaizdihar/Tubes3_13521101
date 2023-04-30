import BaseAlgorithm from "./base";

export class DateQuestion implements BaseAlgorithm {
  protected regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  protected checkRegex = /^(?:Hari apa )?(\d{1,2}\/\d{1,2}\/\d{4})(\?)?$/i;
  constructor() {}

  getResponse(input: string) {
    input = input.replace(/\?/g, "").replace(/\Hari apa /gi, "");
    //const expression = input.replace(/^(?:Hari apa )?(\d{1,2}\/\d{1,2}\/\d{4})\?$/, "");
    const match = this.regex.exec(input);

    if (!this.regex.test(input)) {
      return "Pertanyaan yang dimasukkan tidak sesuai";
    } else if (match) {
      const year = parseInt(match[3] as string);
      const month = parseInt(match[2] as string) - 1; // subtract 1 to get zero-indexed month
      const day = parseInt(match[1] as string);

      if (
        month < 0 ||
        month > 11 ||
        day < 1 ||
        day > new Date(year, month + 1, 0).getDate()
      ) {
        return "Tanggal yang dimasukkan tidak sesuai";
      } else {
        const date = new Date(year, month, day);
        const dayName = date.toLocaleString("id-ID", { weekday: "long" });
        return "Hari itu adalah hari " + dayName;
      }
    }
    return "Maaf, tanggal yang dimasukkan tidak sesuai.";
  }

  isMatch(input: string) {
    return this.checkRegex.test(input);
  }
}
