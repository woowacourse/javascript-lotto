import readline from "readline";

const MESSAGE = Object.freeze({
  MONEY: "구입금액을 입력해 주세요.",
  NO_INPUT: "입력 값을 적어주세요.",
  WIN_LOTTO: "당첨 번호를 입력해주세요."
});

const InputView = {
  readMoney: async () => {
    const moneyInput = await this.readLineAsync(MESSAGE.MONEY);
    this.validInput(moneyInput);
    return Number(moneyInput);
  },

  readWinLottoNumbers: async () => {
    const winLottoInput = await this.readLineAsync(MESSAGE.WIN_LOTTO);
    this.validInput(winLottoInput)
    return winLottoInput.split(",")
  }

  validInput(input) {
    if (!input) throw new Error(MESSAGE.NO_INPUT);
  },

  readLineAsync: async (message) =>
    new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(message, (input) => {
        rl.close();
        resolve(input);
      });
    }),
};

export default InputView;
