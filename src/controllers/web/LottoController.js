import { EVENT_TYPES } from "../../constants/constants.js";

class LottoController {
  constructor(domain, view) {
    this.domain = domain;
    this.view = view;
    this.#setEvent();
  }

  #setEvent() {
    this.view.app.addEventListener(
      EVENT_TYPES.purchase,
      this.#handlePurchase.bind(this),
    );
    this.view.app.addEventListener(
      EVENT_TYPES.result,
      this.#handleResult.bind(this),
    );
    this.view.app.addEventListener(
      EVENT_TYPES.restart,
      this.#handleRestart.bind(this),
    );
  }

  #handlePurchase(event) {
    const { purchaseAmount } = event.detail;
    this.domain.setPurchaseAmount(purchaseAmount);
    this.domain.issueLottos();

    this.view.updateIssuedLotto(this.domain.lottos);
    this.view.initWinningLotto();
  }

  #handleResult(event) {
    const { winningNumbers, bonusNumber } = event.detail;
    const { statistics, profitRatio } = this.domain.calculateWinningStatistics(
      winningNumbers,
      bonusNumber,
    );

    this.view.showResult(statistics, profitRatio);
  }

  #handleRestart() {
    this.view.restartLotto();
  }
}

export default LottoController;
