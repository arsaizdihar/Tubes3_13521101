import BaseAlgorithm from "./base";

export class Calculator implements BaseAlgorithm {
  private regex = /^[\d+\-*/^().\s]+(\?)?$/;

  constructor() {}

  getResponse(input: string) {
    const expression = input.replace(/[^\d+\-*/()\^.\s-]/g, "");

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
      expression.match(/(\d+(\.\d+)?|\d+(\.\d+)?|-)|([\+\-\*\/\^\(\)])/g) || [];
    const opStack: string[] = [];
    const valStack: Array<number | string> = [];
    let i = 0;
    let nextNegative = false;

    for (const token of tokens) {
      if (/^\d+(\.\d+)?|-\d+(\.\d+)?$/.test(token)) {
        let val = parseFloat(token);
        if (nextNegative) {
          val = -val;
          nextNegative = false;
        }
        valStack.push(val);
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
        if (i + 1 < tokens.length && this.isOperator(tokens[i + 1])) {
          const next = tokens[i + 1];
          while (
            opStack.length &&
            this.isOperator(opStack[opStack.length - 1]) &&
            this.getPrecedence(next) <=
              this.getPrecedence(opStack[opStack.length - 1])
          ) {
            const op = opStack.pop();
            const b = valStack.pop() as number;
            const a = valStack.pop() as number;
            const result = this.operation(a, b, op as string);
            valStack.push(result);
          }
        }
      } else {
        if (valStack.length === 0 && token === "-") {
          nextNegative = true;
        } else if (
          opStack.length === 0 ||
          opStack[opStack.length - 1] == "(" ||
          this.getPrecedence(token) >
            this.getPrecedence(opStack[opStack.length - 1])
        ) {
          opStack.push(token);
        } else {
          while (
            opStack.length > 0 &&
            opStack[opStack.length - 1] !== "(" &&
            this.getPrecedence(opStack[opStack.length - 1]) >=
              this.getPrecedence(token) &&
            (opStack[opStack.length - 1] !== "^" || token !== "^")
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
      i++;
    }

    if (opStack.length != valStack.length - 1) {
      throw new Error("Sintaks persamaan tidak sesuai");
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
    } else if (result > -1 && result < 1) {
      return result.toFixed(1 - Math.floor(Math.log10(result)));
    } else {
      return Math.round((result + Number.EPSILON) * 100) / 100;
    }
  }

  private isOperator(token: string) {
    return /[\+\-\*\/\^]/.test(token);
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
