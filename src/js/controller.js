import LottoModel from "./model.js";
import LottoView from "./view.js";
import Validator from "./validator/validator.js";
import { $, getQuotient, getRandomNumber, sortByNumber } from "./util.js";
import { LOTTO, SELECTOR } from "./constant.js";

class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.view = new LottoView();
    this.validator = new Validator();
  }

  init() {
    this.model.init();
    this.view.reset();
    this.handlePrice();
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
    this.view.renderWinningSection();
    this.renderPocketLottos();
    this.handlePocket();
  }

  manageLotto() {
    const price = Number(this.getAndClearBuyValue());
    const alertMessage = this.validator.isPriceValid(price);
    if (alertMessage !== null) {
      return alert(alertMessage);
    }

    this.model.init();
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
    $buyButton.addEventListener("click", () => {
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
