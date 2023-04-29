
import BaseAlgorithm from "./base";

export class DateQuestion implements BaseAlgorithm {
  protected regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  constructor() {}

  getResponse(input: string) {
    //const expression = input.replace(/^(?:Hari apa )?(\d{1,2}\/\d{1,2}\/\d{4})\?$/, "");
    const match = this.regex.exec(input);
    
    if (!this.regex.test(input)) {
        return "Pertanyaan yang dimasukkan tidak sesuai";
    }

    else if (match) {
      try {
        const year = parseInt(match[3] as string);
        const month = parseInt(match[2] as string) - 1; // subtract 1 to get zero-indexed month
        const day = parseInt(match[1] as string);

        if (month < 0 || month > 11 || day < 1 || day > new Date(year, month + 1, 0).getDate()) {
          return ("Tanggal yang dimasukkan tidak sesuai");
        } else {
          const date = new Date(year, month, day);
          const dayName = date.toLocaleString('en-US', { weekday: 'long' });
          return("Hari itu adalah " + dayName);
        }
      } 
    catch (error) {
        return "Tanggal yang dimasukkan tidak sesuai";
    }
  } 
  return "test2";
}

  isMatch(input: string) {
    return this.regex.test(input);
  }
}