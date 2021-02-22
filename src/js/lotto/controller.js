import LottoModel from "./model.js";
import LottoView from "./view.js";
import Validator from "./validator.js";
import { getLottoCount, generateLotto } from "./game.js";
import { $ } from "../utils/util.js";
import { SELECTOR } from "../constants/constant.js";

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

  getBuyInput() {
    const value = $(SELECTOR.BUY_INPUT).value;
    $(SELECTOR.BUY_INPUT).value = "";

    return value;
  }

  managePocket() {
    const lottos = this.model.lottos;
    const amount = this.model.amount;
    this.view.renderPocketSection(amount);
    this.view.renderPocketLottos(lottos);
    this.view.renderWinningSection();
    this.handlePocket();
  }

  manageLotto() {
    const price = Number(this.getBuyInput());
    const alertMessage = this.validator.isPriceValid(price);
    if (alertMessage !== null) {
      return alert(alertMessage);
    }

    const count = getLottoCount(price);
    this.model.init();
    for (let i = 0; i < count; i++) {
      this.model.addLotto(generateLotto());
    }
    this.managePocket();
  }

  togglePocketDetail() {
    const lottos = this.model.lottos;
    this.view.togglePocketLottos();
    this.view.renderPocketLottos(lottos);
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
      this.togglePocketDetail();
    });
  }
}

export default LottoController;
