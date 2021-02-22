import Template from "../layouts/template.js"
import { $ } from "../utils/util.js"
import { SELECTOR } from "../constants/constant.js"

class LottoView {
  constructor() {
    this.template = new Template()
  }

  renderBuySection() {
    const $buySection = $(SELECTOR.BUY)
    $buySection.innerHTML = this.template.buySectionTemplate()
  }

  renderPocketSection(amount) {
    const $pocketSection = $(SELECTOR.POCKET)
    $pocketSection.innerHTML = this.template.pocketSectionTemplate(amount)
  }

  renderPocketLottos(lottos) {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    const detail = $pocketLottos.dataset.detail === "show"
    $pocketLottos.innerHTML = this.template.pocketLottosTemplate(lottos, detail)
  }

  togglePocketLottos() {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    if ($pocketLottos.dataset.detail === "hide") {
      $pocketLottos.dataset.detail = "show"
    } else {
      $pocketLottos.dataset.detail = "hide"
    }
  }

  renderWinningSection() {
    const $winningSection = $(SELECTOR.WINNING)
    $winningSection.innerHTML = this.template.winningSectionTemplate()
  }

  resetPocketSection() {
    const $pocketSection = $(SELECTOR.POCKET)
    $pocketSection.innerHTML = ""
  }

  resetWinningSection() {
    const $winningSection = $(SELECTOR.WINNING)
    $winningSection.innerHTML = ""
  }

  reset() {
    this.renderBuySection()
    this.resetPocketSection()
    this.resetWinningSection()
  }
}

export default LottoView
