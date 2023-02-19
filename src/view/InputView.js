import Console from "../util/Console";

const InputView = {
  async inputMoney(query) {
    const buyMoney = await Console.read(query);
    return buyMoney;
  },

  async inputWinningNumbers(query) {
    const winningNumbers = await Console.read(query);
    return winningNumbers;
  },

  async inputBonusNumber(query) {
    const bonusNumber = await Console.read(query);
    return bonusNumber;
  },

  async inputRetry(query) {
    const retryInput = await Console.read(query);
    return retryInput;
  },
};

export default InputView;
