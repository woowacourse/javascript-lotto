import LottoController from './controller/LottoController.js';

class App {
  #controller;

  constructor() {
    this.#controller = new LottoController();
  }

  // eslint-disable-next-line max-lines-per-function
  // async run() {
  //   const lottos = await this.#purchaseLottos();

  //   const winningNumbers = await this.#controller.inputWinningNumbers();
  //   const bonusNumber = await this.#controller.inputBonusNumber(winningNumbers);

  //   this.#showWinningResult(lottos, winningNumbers, bonusNumber);
  // }
  async run() {
    let restart;
    do {
      const lottos = await this.#purchaseLottos();

      const winningNumbers = await this.#controller.inputWinningNumbers();
      const bonusNumber = await this.#controller.inputBonusNumber(winningNumbers);

      this.#showWinningResult(lottos, winningNumbers, bonusNumber);

      restart = await this.#controller.inputRestartResponse();
    } while (restart);
  }

  async #purchaseLottos() {
    const purchaseAmount = await this.#controller.inputPurchaseAmount();
    const issueQuantity = this.#controller.calculateIssueQuantity(purchaseAmount);
    const lottos = this.#controller.issueLottos(issueQuantity);

    this.#controller.displayIssueQuantity(issueQuantity);
    this.#controller.displayLottoNumbersList(lottos);

    return lottos;
  }

  #showWinningResult(lottos, winningNumbers, bonusNumber) {
    const winningResult = this.#controller.determineLottoRanks(lottos, winningNumbers, bonusNumber);
    const profitRate = this.#controller.calculateProfitRate(winningResult);
    this.#controller.displayWinningResult(winningResult, profitRate);
  }
}

export default App;
