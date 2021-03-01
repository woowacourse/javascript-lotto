import { getBuyInput } from "../components/buy.js"
import { getTicketsCount } from "../components/pocket.js"
import { getAnswerInput } from "../components/winning.js"
import { $ } from "../util.js"
import { SELECTOR } from "../constants/constant.js"
import { checkAnswerValid, checkPriceValid } from "../validators/validator.js"
import { getManualInput } from "../components/manual.js"

class LottoController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  init() {
    this.model.init()
    this.view.init()
    this.#handlePrice()
  }

  #reset() {
    this.model.init()
    this.view.reset()
    this.#handlePrice()
  }

  #manageBuyMethod() {
    const price = getBuyInput()
    const errorMessage = checkPriceValid(price)
    if (errorMessage) {
      return alert(errorMessage)
    }

    const amount = getTicketsCount(price)
    this.model.generateLottos(amount)
    this.view.renderBuyMethodSection(this.model.lottos)
    this.view.resetPocketSection()
    this.view.resetWinningSection()
    this.#handleManual()
    this.#handleAuto()
  }

  #manageManual() {
    const manualNumbers = getManualInput()
    // TODO : 유효성 검사

    this.model.generateManualLotto(manualNumbers)
    this.view.renderBuyMethodSection(this.model.lottos)
    if (this.model.amount === 0) {
      this.#managePocket()
    } else {
      this.#handleManual()
      this.#handleAuto()
    }
  }

  #managePocket() {
    this.model.generateRandomLottos(this.model.lottos.amount)
    this.view.resetBuyMethodSection()
    this.view.renderPocketSection(this.model.lottos)
    this.view.renderWinningSection()
    this.#handlePocket()
    this.#handleModalOpen()
  }

  #manageModalOpen() {
    const answer = getAnswerInput()
    const errorMessage = checkAnswerValid(answer)
    if (errorMessage) {
      return alert(errorMessage)
    }

    this.model.calculateLottosResult(answer)
    this.view.renderModalSection(this.model.lottoResult, this.model.profitRate)
    this.#handleModalClose()
    this.#handleReset()
  }

  #manageModalClose() {
    this.view.toggleModalSection()
    this.model.resetLottoResult()
  }

  #handlePrice() {
    const $buyButton = $(SELECTOR.BUY_BUTTON)
    $buyButton.addEventListener("click", () => {
      this.#manageBuyMethod()
    })
  }

  #handleManual() {
    const $manualButton = $("#manual-button")
    $manualButton.addEventListener("click", () => {
      this.#manageManual()
    })
  }

  #handleAuto() {
    const $autoButton = $("#auto-button")
    $autoButton.addEventListener("click", () => {
      this.#managePocket()
    })
  }

  #handlePocket() {
    const $pocketButton = $(SELECTOR.POCKET_TOGGLE)
    $pocketButton.addEventListener("click", () => {
      this.view.togglePocketDetail()
    })
  }

  #handleModalOpen() {
    const $showResultButton = $(SELECTOR.OPEN_RESULT_MODAL_BUTTON)
    $showResultButton.addEventListener("click", () => {
      this.#manageModalOpen()
    })
  }

  #handleModalClose() {
    const $modalClose = $(SELECTOR.MODAL_CLOSE)
    $modalClose.addEventListener("click", () => {
      this.#manageModalClose()
    })
  }

  #handleReset() {
    const $resetButton = $(SELECTOR.RESET_BUTTON)
    $resetButton.addEventListener("click", () => {
      this.#reset()
    })
  }
}

export default LottoController
