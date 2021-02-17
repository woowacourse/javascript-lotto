import LottoModel from "./model.js";
import { $, getQuotient, getRandomNumber } from "./util.js";
import LottoView from "./view.js";

class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.view = new LottoView();
  }

  init() {
    this.view.reset();
    this.handlePrice();
  }

  getBuyInputValue() {
    return $("#buy-input").value;
  }

  getCount(price) {
    return getQuotient(price, 1000);
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size !== 6) {
      lotto.add(getRandomNumber(1, 45));
    }

    return [...lotto].sort();
  }

  createPocket() {
    const lottos = this.model.lottos;
    const pocketDetail = this.model.detail;
    this.view.renderPocketSection(lottos, pocketDetail);
    //this.handlePocket();
    this.view.renderWinningSection();
  }

  manageLotto() {
    const price = parseInt(this.getBuyInputValue(), 10);
    const count = this.getCount(price);
    for (let i = 0; i < count; i++) {
      this.model.addLotto(this.generateLotto());
    }
    this.createPocket();
  }

  manageDetail() {
    console.log(this);
    this.model.toggleDetail();
    this.createPocket();
  }

  handlePrice() {
    const $buyButton = $("#buy-button");
    $buyButton.addEventListener("click", () => {
      this.manageLotto();
    });
  }

  handlePocket() {
    const $pocketButton = $("#pocket-toggle-number");
    const manageDetail = this.manageDetail();
    $pocketButton.addEventListener("change", () => {
      this.manageDetail();
    });
  }
}

export default LottoController;
