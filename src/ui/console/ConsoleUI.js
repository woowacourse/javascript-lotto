export default class ConsoleUI {
  #inputView;
  #outputView;

  constructor({ inputView, outputView }) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }
  async readAmount() {
    return this.#inputView.readPurchaseAmount();
  }

  async readWinningLottoNumber() {
    return this.#inputView.readWinningLottoNumber();
  }

  async readBonusNumber() {
    return this.#inputView.readWinningBonusNumber();
  }

  async readAskRetry() {
    return this.#inputView.readAskRetry();
  }

  printLottos(lottos) {
    this.#outputView.printLottos(lottos);
  }

  printResult(result, prize) {
    this.#outputView.printResult(result, prize);
  }

  printError(error) {
    this.#outputView.printError(error);
  }
}
