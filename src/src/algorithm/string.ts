export class StringMatching {
  private prefixTable: number[];
  constructor(private algorithm: "KMP" | "BM", private pattern: string) {
    this.pattern = pattern.toLowerCase();
    this.prefixTable = new Array(pattern.length).fill(0);
    if (algorithm === "KMP") {
      let i = 0;
      for (let j = 1; j < this.pattern.length; j++) {
        while (i > 0 && this.pattern.charAt(i) !== this.pattern.charAt(j)) {
          i = this.prefixTable[i - 1];
        }
        if (this.pattern.charAt(i) === this.pattern.charAt(j)) {
          i++;
        }
        this.prefixTable[j] = i;
      }
    }
  }

  check(text: string, exact = true) {
    text = text.toLowerCase();
    if (exact && this.pattern.length !== text.length) return false;
    if (this.algorithm === "BM") {
      return this.checkBM(text);
    } else {
      return this.checkKMP(text);
    }
  }

  private checkKMP(text: string) {
    let j = 0;
    let k = 0;

    while (j < text.length) {
      if (this.pattern.charAt(k) === text.charAt(j)) {
        j++;
        k++;
      }
      if (k === this.pattern.length) {
        return true;
      } else if (j < text.length && this.pattern.charAt(k) !== text.charAt(j)) {
        if (k !== 0) {
          k = this.prefixTable[k - 1];
        } else {
          j++;
        }
      }
    }
    return false;
  }

  private checkBM(text: string) {
    if (this.pattern.length > text.length) return null;
    const last = new Map<number, number>();
    for (let i = 0; i < text.length; i++) {
      last.set(text.charCodeAt(i), i);
    }
    let i = this.pattern.length - 1;
    let j = i;
    do {
      if (this.pattern.charAt(j) === text.charAt(i)) {
        if (j === 0) {
          return true;
        }
        i--;
        j--;
      } else {
        const lastOccurance = last.get(this.pattern.charCodeAt(i)) ?? -1;
        i = i + this.pattern.length - Math.min(j, 1 + lastOccurance);
        j = this.pattern.length - 1;
      }
    } while (i <= text.length - 1);
    return false;
  }

  static getLevensteinDistance(a: string, b: string) {
    const m = a.length;
    const n = b.length;
    const d = Array.from<number[], number[]>({ length: m + 1 }, () =>
      new Array(n + 1).fill(0)
    );
    for (let i = 1; i <= m; i++) {
      d[i][0] = i;
    }

    for (let j = 1; j <= n; j++) {
      d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
      for (let i = 1; i <= m; i++) {
        let substitionCost = 1;
        if (a.charAt(i) === b.charAt(j)) {
          substitionCost = 0;
        }

        d[i][j] = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + substitionCost
        );
      }
    }
    return d[m][n];
  }
}
