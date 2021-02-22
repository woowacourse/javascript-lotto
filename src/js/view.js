import Template from "./template.js"
import { $ } from "./util.js"
import { SELECTOR } from "./constant.js"

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

  renderPocketLottos(lottos, detail) {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    $pocketLottos.innerHTML = this.template.pocketLottosTemplate(lottos, detail)
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
