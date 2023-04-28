import BaseAlgorithm from "./base";

export class Calculator implements BaseAlgorithm {
  constructor() {}

  getResponse(input: string) {
    const expression = input.replace(/[^\d+\-*/()\^?]/g, ""); // Remove any non-numeric, non-operator characters except ^ and ?

    if (!/^\d+(?:[\+\-\*\/\^()\s]*\d+)*\s*[?]?$/.test(expression)) {
      return "Sintaks persamaan tidak sesuai";
    }

    try {
      // Evaluate the expression using eval() function
      const result = eval(expression.replace(/\^/g, "**")); // Replace ^ with ** to use it as power operator
      return result.toString(); // Return the result with a trailing question mark
    } catch (error) {
      return "Sintaks persamaan tidak sesuai";
    }
  }

  isMatch(input: string) {
    return  /^\d+(?:[\+\-\*\/\^()\s]*\d+)*\s*[?]?$/.test(input);
  }
}

// const calculator = new Calculator();
// console.log(calculator.getResponse("1+1")); // Expected output: "2?"
