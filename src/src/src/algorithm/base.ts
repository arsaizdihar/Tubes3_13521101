export default interface BaseAlgorithm {
    getResponse: (input: string) => string;
    isMatch: (input: string) => boolean;
  }