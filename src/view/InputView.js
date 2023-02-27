import Console from "../util/Console";

const InputView = {
  async inputMoney(query) {
    return Console.read(query);
  },

  async inputWinningNumbers(query) {
    return await Console.read(query);
  },

  async inputBonusNumber(query) {
    return Console.read(query);
  },

  async inputRetry(query) {
    return Console.read(query);
  },
};

export default InputView;
