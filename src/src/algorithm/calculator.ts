import BaseAlgorithm from "./base";

export class Calculator implements BaseAlgorithm {
  private regex = /^[\d+\-*/^()\s]+(\?)?$/;

  constructor() {}

  getResponse(input: string) {
    const expression = input.replace(/[^\d+\-*/()\^]/g, "");

    if (!/^[\d+\-*/^()?\s]+(\?)?$/.test(expression)) {
      return "Sintaks persamaan tidak sesuai";
    }

    try {
      const result = this.evaluate(expression);
      return "Hasilnya adalah " + result.toString();
    } catch (error) {
      return "Sintaks persamaan tidak sesuai";
    }
  }

  isMatch(input: string) {
    return this.regex.test(input);
  }

  private evaluate(expression: string) {
    const tokens = expression.match(/(\d+)|([\+\-\*\/\^\(\)])/g) || [];
    const opStack: string[] = [];
    const valStack: number[] = [];

    for (const token of tokens) {
      if (/^\d+$/.test(token)) {
        valStack.push(parseInt(token, 10));
      } else if (token === '(') {
        opStack.push(token);
      } else if (token === ')') {
        while (opStack[opStack.length - 1] !== '(') {
          const op = opStack.pop();
          const b = valStack.pop() as number;
          const a = valStack.pop() as number;
          const result = this.operation(a, b, op as string);
          valStack.push(result);
        }
        opStack.pop();
      } else {
        while (opStack.length > 0 && this.getPrecedence(opStack[opStack.length - 1]) >= this.getPrecedence(token)) {
          const op = opStack.pop();
          const b = valStack.pop() as number;
          const a = valStack.pop() as number;
          const result = this.operation(a, b, op as string);
          valStack.push(result);
        }
        opStack.push(token);
      }
    }

    while (opStack.length > 0) {
      const op = opStack.pop();
      const b = valStack.pop() as number;
      const a = valStack.pop() as number;
      const result = this.operation(a, b, op as string);
      valStack.push(result);
    }
    return valStack[0];
  }

  private getPrecedence(operator: string) {
    switch (operator) {
      case '^':
        return 3;
      case '*':
      case '/':
        return 2;
      case '+':
      case '-':
        return 1;
      default:
        return 0;
    }
  }

  private operation(a: number, b: number, operator: string) {
    switch (operator) {
      case '^':
        return Math.pow(a, b);
      case '*':
        return a * b;
      case '/':
        if (b === 0) {
          throw new Error("Divide by zero error");
        }
        return a / b;
      case '+':
        return a + b;
      case '-':
        return a - b;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
}

// const calculator = new Calculator();
// console.log(calculator.getResponse("1+1")); // Expected output: "2?"
