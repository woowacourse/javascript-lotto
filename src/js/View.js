import { $ } from "./util.js";
import Template from "./template.js";

class LottoView {
  constructor() {
    this.template = new Template();
  }

  renderBuySection() {
    const $buySection = $("#buy");
    $buySection.innerHTML = this.template.buySectionTemplate();
  }

  renderPocketSection(lottos, detail) {
    const $pocketSection = $("#pocket");
    $pocketSection.innerHTML = this.template.pocketSectionTemplate(
      lottos,
      detail
    );
  }

  renderWinningSection() {
    const $winningSection = $("#winning");
    $winningSection.innerHTML = this.template.winningSectionTemplate();
  }

  resetPocketSection() {
    const $pocketSection = $("#pocket");
    $pocketSection.innerHTML = "";
  }

  resetWinningSection() {
    const $winningSection = $("#winning");
    $winningSection.innerHTML = "";
  }

  reset() {
    this.renderBuySection();
    this.resetPocketSection();
    this.resetWinningSection();
  }
}

export default LottoView;
