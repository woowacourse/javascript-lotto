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

  renderWinningSection() {
    const $winningSection = $(SELECTOR.WINNING)
    $winningSection.innerHTML = this.template.winningSectionTemplate()
  }

  togglePocketLottos() {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    $pocketLottos.classList.toggle(SELECTOR.SHOW)
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
