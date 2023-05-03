import BaseAlgorithm from "./base";

export class Calculator implements BaseAlgorithm {
  private regex = /^[\d+\-*/^().\s]+(\?)?$/;

  constructor() {}

  getResponse(input: string) {
    const expression = input.replace(/[^\d+\-*/()\^.\s]/g, "");

    if (
      !/^[\d+\-*/^()\s.]+(\?)?$/.test(expression) ||
      /[\+\-*/^]{2,}/.test(expression)
    ) {
      return "Sintaks persamaan tidak sesuai";
    }

    try {
      const result = this.evaluate(expression);
      return "Hasilnya adalah " + result.toString();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Hasilnya tidak terdefinisi") {
          return "Hasilnya tidak terdefinisi";
        } else {
          return error.message;
        }
      }
      return "Sintaks persamaan tidak sesuai";
    }
  }

  isMatch(input: string) {
    return this.regex.test(input);
  }

  private evaluate(expression: string) {
    const tokens =
      expression.match(/(\d+(\.\d+)?|-\d+(\.\d+)?)|([\+\-\*\/\^\(\)])/g) || [];

    const opStack: string[] = [];
    const valStack: Array<number | string> = [];

    for (const token of tokens) {
      if (/^\d+(\.\d+)?|-\d+(\.\d+)?$/.test(token)) {
        valStack.push(parseFloat(token));
      } else if (token === "(") {
        opStack.push(token);
      } else if (token === ")") {
        while (opStack[opStack.length - 1] !== "(") {
          const op = opStack.pop();
          const b = valStack.pop() as number;
          const a = valStack.pop() as number;
          const result = this.operation(a, b, op as string);
          valStack.push(result);
        }
        opStack.pop();
      } else {
        while (
          opStack.length > 0 &&
          this.getPrecedence(opStack[opStack.length - 1]) >=
            this.getPrecedence(token)
        ) {
          const op = opStack.pop();
          const b = valStack.pop() as number;
          const a = valStack.pop() as number;
          if (op === "/" && b === 0) {
            throw new Error("Hasilnya tidak terdefinisi");
          }
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
    const result = parseFloat(valStack[0].toString());
    if (result % 1 === 0) {
      return result;
    } else {
      return result.toFixed(2);
    }
  }

  private getPrecedence(operator: string) {
    switch (operator) {
      case "^":
        return 3;
      case "*":
      case "/":
        return 2;
      case "+":
      case "-":
        return 1;
      default:
        return 0;
    }
  }

  private operation(a: number, b: number, operator: string) {
    switch (operator) {
      case "^":
        return Math.pow(a, b);
      case "*":
        return a * b;
      case "/":
        if (b === 0) {
          throw new Error("Hasilnya tidak terdefinisi");
        }
        return a / b;
      case "+":
        return a + b;
      case "-":
        return a - b;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
}
