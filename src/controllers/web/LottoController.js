import View from "../../views/web/View.js";
import issueLottos from "../../domains/issueLottos.js";

class LottoController {
  constructor() {
    this.view = new View();
    this.#setEvent();
  }

  #setEvent() {
    this.view.app.addEventListener("purchase", this.#handlePurchase.bind(this));
    this.view.app.addEventListener("result", this.#handleResult.bind(this));
  }

  #handlePurchase(event) {
    const { purchaseAmount } = event.detail;
    const lottos = issueLottos(purchaseAmount);

    const issuedLotto = this.view.app.querySelector("issued-lotto");
    issuedLotto.updateLottos(lottos);

    const winningLotto = this.view.app.querySelector("winning-lotto");
    winningLotto.initWinningLotto();
  }

  #handleResult(event) {
    const { winningNumbers, bonusNumber } = event.detail;
  }
}

export default LottoController;
