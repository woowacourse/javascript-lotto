import LottoModel from "./model.js";
import LottoView from "./view.js";
import PriceValidator from "./validator.js";
import { $, getQuotient, getRandomNumber, sortByNumber } from "../util.js";
import { LOTTO, SELECTOR } from "./constant.js";

class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.view = new LottoView();
    this.priceValidator = new PriceValidator();
  }

  init() {
    this.view.reset();
    this.handlePrice();
    this.model.init();
  }

  getAndClearBuyValue() {
    const value = $(SELECTOR.BUY_INPUT).value;
    $(SELECTOR.BUY_INPUT).value = "";

    return value;
  }

  getCount(price) {
    return getQuotient(price, LOTTO.PRICE);
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size !== LOTTO.SIZE) {
      lotto.add(getRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
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
    const lottos = this.model.lottos;
    const price = Number(this.getAndClearBuyValue());
    const alertMessage = this.priceValidator.isValid(price, lottos);

    if (alertMessage !== null) {
      alert(alertMessage);
      return;
    }

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
    const $buyButton = $(SELECTOR.BUY_BUTTON);
    $buyButton.addEventListener("click", (event) => {
      event.preventDefault();

      this.manageLotto();
    });
  }

  handlePocket() {
    const $pocketButton = $(SELECTOR.POCKET_TOGGLE);
    $pocketButton.addEventListener("click", () => {
      this.manageDetail();
    });
  }
}

export default LottoController;
