import Template from "./template.js";
import { $ } from "../util.js";
import { SELECTOR } from "./constant.js";

class LottoView {
  constructor() {
    this.template = new Template();
  }

  resetBuySection() {
    const $buySection = $(SELECTOR.BUY);
    $buySection.innerHTML = this.template.buySection();
  }

  renderPocketSection(amount) {
    const $pocketSection = $(SELECTOR.POCKET);
    $pocketSection.innerHTML = this.template.pocketSection(amount);
  }

  renderPocketLottos(lottos, detail) {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS);
    $pocketLottos.innerHTML = this.template.pocketLottos(lottos, detail);
  }

  renderWinningSection() {
    const $winningSection = $(SELECTOR.WINNING);
    $winningSection.innerHTML = this.template.winningSection();
  }

  resetPocketSection() {
    const $pocketSection = $(SELECTOR.POCKET);
    $pocketSection.innerHTML = "";
  }

  resetWinningSection() {
    const $winningSection = $(SELECTOR.WINNING);
    $winningSection.innerHTML = "";
  }

  reset() {
    this.resetBuySection();
    this.resetPocketSection();
    this.resetWinningSection();
  }
}

export default LottoView;
