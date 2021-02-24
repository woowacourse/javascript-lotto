import {
  buySectionTemplate,
  pocketSectionTemplate,
  winningSectionTemplate,
  modalSectionTemplate,
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

  renderModalSection() {
    const $modalSection = $(".modal")
    $modalSection.innerHTML = modalSectionTemplate()
    this.toggleModalSection()
  }

  togglePocketDetail() {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    $pocketLottos.classList.toggle("show")
  }

  toggleModalSection() {
    const $modalSection = $(".modal")

    $modalSection.classList.toggle("open")
  }

  resetPocketSection() {
    const $pocketSection = $(SELECTOR.POCKET)
    $pocketSection.innerHTML = ""
  }

  resetWinningSection() {
    const $winningSection = $(SELECTOR.WINNING)
    $winningSection.innerHTML = ""
  }

  resetModalSection() {
    const $modalSection = $(".modal")
    $modalSection.innerHTML = ""
    this.toggleModalSection()
  }

  reset() {
    this.renderBuySection()
    this.resetPocketSection()
    this.resetWinningSection()
    this.resetModalSection()
  }

  init() {
    this.renderBuySection()
  }
}

export default LottoView
