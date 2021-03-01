import LottoModel from "../models/lotto-model.js";
import LottoView from "../views/lotto-view.js";
import { getPriceInputErrorMessage } from "../validators/price-validator.js";
import { $, getQuotient, generateRandomNumber, sortByNumber } from "../util.js";
import { LOTTO, SELECTOR } from "../constants/index.js";

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
    const value = $(SELECTOR.BUY_INPUT).value;
    $(SELECTOR.BUY_INPUT).value = "";

    return value;
  }

  getCount(price) {
    return getQuotient(price, LOTTO.PRICE);
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
    const errorMessage = getPriceInputErrorMessage(price, lottos);

    if (errorMessage !== null) {
      alert(errorMessage);
      return;
    }

    const count = this.getCount(price);
    for (let i = 0; i < count; i++) {
      this.model.addLotto();
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
