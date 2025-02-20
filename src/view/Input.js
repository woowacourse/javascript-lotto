const Input = {
  async purchasePrice() {
    const purchasePrice = await Input.readLineAsync(
      "구입금액을 입력해 주세요."
    );
    return purchasePrice;
  },

  async winningNumbers() {
    const winningNumbers = await Input.readLineAsync(
      "당첨 번호를 입력해 주세요. "
    );
    return winningNumbers;
  },

  async purchasePrice() {
    const bonusNumber = await Input.readLineAsync(
      "보너스 번호를 입력해 주세요. "
    );
    return bonusNumber;
  },

  async restart() {
    const restart = await Input.readLineAsync("다시 시작하시겠습니까? (y/n) ");
    return restart;
  },

  readLineAsync(query) {
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

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
};

export default Input;
