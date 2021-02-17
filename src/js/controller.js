import LottoModel from "./model.js";
import { $, getQuotient, getRandomNumber, sortByNumber } from "./util.js";
import LottoView from "./view.js";

class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.view = new LottoView();
  }

  init() {
    this.view.reset();
    this.handlePrice();
    this.model.init();
  }

  getAndClearBuyValue() {
    const value = $("#buy-input").value;
    $("#buy-input").value = "";

    return value;
  }

  getCount(price) {
    return getQuotient(price, 1000);
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size !== 6) {
      lotto.add(getRandomNumber(1, 45));
    }

    return sortByNumber([...lotto]);
  }

  renderPocketLottos() {
    const lottos = this.model.lottos;
    const pocketDetail = this.model.detail;
    this.view.renderPocketLottos(lottos, pocketDetail);
  }

  managePocket() {
    const amount = this.model.amount;
    this.view.renderPocketSection(amount);
    this.handlePocket();
    this.renderPocketLottos();
    this.view.renderWinningSection();
  }

  manageLotto() {
    const buyValue = this.getAndClearBuyValue();
    const price = parseInt(buyValue, 10);
    const count = this.getCount(price);
    for (let i = 0; i < count; i++) {
      this.model.addLotto(this.generateLotto());
    }
    this.managePocket();
  }

  manageDetail() {
    this.model.toggleDetail();
    this.renderPocketLottos();
  }

  handlePrice() {
    const $buyButton = $("#buy-button");
    $buyButton.addEventListener("click", () => {
      this.manageLotto();
    });
  }

  handlePocket() {
    const $pocketButton = $("#pocket-toggle-number");
    $pocketButton.addEventListener("click", () => {
      this.manageDetail();
    });
  }
}

export default LottoController;
