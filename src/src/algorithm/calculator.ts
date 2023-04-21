import BaseAlgorithm from "./base";

export class Calculator implements BaseAlgorithm {
  constructor() {}

  getResponse(input: string) {
    return "";
  }

  isMatch(input: string) {
    return /213123/.test(input);
  }
}
