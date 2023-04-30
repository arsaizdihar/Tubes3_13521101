import { ChatStorage } from "@prisma/client";
import BaseAlgorithm from "./base";

export class Question implements BaseAlgorithm {
  private data: ChatStorage[] = [];
  constructor(private algorithm: "KMP" | "BM") {}

  set setData(data: ChatStorage[]) {
    this.data = data;
  }

  getResponse(input: string) {
    return "";
  }

  isMatch(input: string) {
    return true;
  }
}