import INPUT_QUERY from "../constants/input-query";
import Console from "../utils/Console";

const InputView = {
  async readInput(query) {
    const input = await Console.readLineAsync(query);

    return input;
  },

  async readPurchaseAmount() {
    return await this.readInput(INPUT_QUERY.purchaseAmount);
  },

  async readWinningLotto() {
    return await this.readInput(INPUT_QUERY.winningLotto);
  },

  async readBonusNumber() {
    return await this.readInput(INPUT_QUERY.bonusNumber);
  },

  async readRetrySign() {
    return await this.readInput(INPUT_QUERY.retrySign);
  },
};

export default InputView;
