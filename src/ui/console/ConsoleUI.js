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
