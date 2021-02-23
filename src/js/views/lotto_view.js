import {
  buySectionTemplate,
  pocketSectionTemplate,
  winningSectionTemplate,
} from "../templates/lotto_template.js"
import { $ } from "../util.js"
import { SELECTOR } from "../constants/constant.js"

class LottoView {
  renderBuySection() {
    const $buySection = $(SELECTOR.BUY)
    $buySection.innerHTML = buySectionTemplate()
  }

  renderPocketSection(amount) {
    const $pocketSection = $(SELECTOR.POCKET)
    $pocketSection.innerHTML = pocketSectionTemplate(amount)
  }

  renderWinningSection() {
    const $winningSection = $(SELECTOR.WINNING)
    $winningSection.innerHTML = winningSectionTemplate()
  }

  togglePocketDetail() {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    $pocketLottos.classList.toggle("show")
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
