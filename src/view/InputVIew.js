import readline from "readline";

class InputView {
  static async readBuyAmount() {
    return await this.#readLineAsync("구입금액을 입력해 주세요.");
  }

  static async readWinningNumbers() {
    return await this.#readLineAsync("당첨 번호를 입력해 주세요. ");
  }

  static async readBonusNumber() {
    return await this.#readLineAsync("보너스 번호를 입력해 주세요. ");
  }

  static async readRetryCheck() {
    return await this.#readLineAsync("다시 시작하시겠습니까? (y/n)");
  }

  static #readLineAsync(query) {
    const inputQuery = `> ${query}`;
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(inputQuery, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
}

export default InputView;
