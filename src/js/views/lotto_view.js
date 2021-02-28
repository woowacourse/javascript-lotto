import {
  buySectionTemplate,
  pocketSectionTemplate,
  winningSectionTemplate,
  modalSectionTemplate,
  buyMethodSectionTemplate,
} from "../templates/lotto_template.js"
import { $ } from "../util.js"
import { SELECTOR } from "../constants/constant.js"

class LottoView {
  renderBuySection() {
    const $buySection = $(SELECTOR.BUY_SECTION)
    $buySection.innerHTML = buySectionTemplate()
  }

  renderBuyMethodSection(amount) {
    const $buyMethodSection = $("#buy-method")
    $buyMethodSection.innerHTML = buyMethodSectionTemplate(amount)
  }

  renderPocketSection(amount) {
    const $pocketSection = $(SELECTOR.POCKET_SECTION)
    $pocketSection.innerHTML = pocketSectionTemplate(amount)
  }

  renderWinningSection() {
    const $winningSection = $(SELECTOR.WINNING_SECTION)
    $winningSection.innerHTML = winningSectionTemplate()
  }

  renderModalSection(lottoResult, profit) {
    const $modalSection = $(SELECTOR.MODAL_SECTION)
    $modalSection.innerHTML = modalSectionTemplate(lottoResult, profit)
    this.toggleModalSection()
  }

  togglePocketDetail() {
    const $pocketLottos = $(SELECTOR.POCKET_LOTTOS)
    $pocketLottos.classList.toggle("show")
  }

  toggleModalSection() {
    const $modalSection = $(SELECTOR.MODAL_SECTION)

    $modalSection.classList.toggle("open")
  }

  resetBuyMethodSection() {
    const $buyMethodSection = $("#buy-method")
    $buyMethodSection.innerHTML = ``
  }

  resetPocketSection() {
    const $pocketSection = $(SELECTOR.POCKET_SECTION)
    $pocketSection.innerHTML = ""
  }

  resetWinningSection() {
    const $winningSection = $(SELECTOR.WINNING_SECTION)
    $winningSection.innerHTML = ""
  }

  resetModalSection() {
    const $modalSection = $(SELECTOR.MODAL_SECTION)
    $modalSection.innerHTML = ""
    this.toggleModalSection()
  }

  reset() {
    this.renderBuySection()
    this.resetBuyMethodSection()
    this.resetPocketSection()
    this.resetWinningSection()
    this.resetModalSection()
  }

  init() {
    this.renderBuySection()
  }
}

export default LottoView
