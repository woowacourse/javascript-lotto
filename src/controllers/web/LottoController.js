import View from "../../views/web/View.js";
import issueLottos from "../../domains/issueLottos.js";

class LottoController {
  constructor() {
    this.view = new View();
    this.setEvent();
  }

  setEvent() {
    this.view.app.addEventListener("purchase", this.handlePurchase.bind(this));
  }

  handlePurchase(event) {
    const { purchaseAmount } = event.detail;
    const lottos = issueLottos(purchaseAmount);

    const issuedLotto = this.view.app.querySelector("issued-lotto");
    if (issuedLotto) {
      issuedLotto.updateLottos(lottos);
    }
  }
}

export default LottoController;
