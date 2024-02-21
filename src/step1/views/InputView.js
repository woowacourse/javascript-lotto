import Console from "../utils/Console";

const InputView = {
  async readInput(query) {
    const input = await Console.readLineAsync(query);

    return input;
  },

  async readPurchaseAmount() {
    return await this.readInput("> 구입금액을 입력해 주세요.");
  },

  async readWinningLotto() {
    return await this.readInput("> 당첨 번호를 입력해 주세요.");
  },

  async readBonusNumber() {
    return await this.readInput("> 보너스 번호를 입력해 주세요.");
  },

  async readRetrySign() {
    return await this.readInput("> 다시 시작하시겠습니까?(y/n)");
  },
};

export default InputView;
