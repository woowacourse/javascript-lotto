import readLine from "readline";

const MESSAGE = Object.freeze({
  MONEY: "구입금액을 입력해 주세요.",
  NO_INPUT: "입력 값을 적어주세요.",
  WIN_LOTTO: "당첨 번호를 입력해주세요.",
  BONUS_NUMBER: "보너스 번호를 입력해주세요.",
});

const InputView = {
  async readMoney() {
    const moneyInput = await this.readLineAsync(MESSAGE.MONEY);
    this.validInput(moneyInput);
    return Number(moneyInput);
  },

  async readWinLottoNumbers() {
    const winLottoInput = await this.readLineAsync(MESSAGE.WIN_LOTTO);
    this.validInput(winLottoInput);
    return winLottoInput.split(",");
  },

  async readBonusNumber() {
    const bonusNumberInput = await this.readLineAsync(MESSAGE.BONUS_NUMBER);
    this.validInput(bonusNumberInput);

    return Number(bonusNumberInput);
  },

  async validInput(input) {
    if (!input) throw new Error(MESSAGE.NO_INPUT);
  },

  async readLineAsync(message) {
    return new Promise((resolve) => {
      const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(message, (input) => {
        resolve(input);
        rl.close();
      });
    });
  },
};

export default InputView;
