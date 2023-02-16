import Console from "../Console.js";

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
};

export default InputView;
