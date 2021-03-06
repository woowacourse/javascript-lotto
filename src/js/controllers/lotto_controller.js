import Buy from "../components/buy.js"
import Manual from "../components/manual.js"
import Answer from "../components/answer.js"
import { $ } from "../util.js"
import { SELECTOR } from "../constants/constant.js"

class LottoController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  init() {
    this.buy = new Buy()
    this.manual = new Manual()
    this.answer = new Answer()
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
    const price = this.buy.manageBuyInput()
    if (!price) return

    this.model.issueLottos(this.buy.getTicketsCount(price))
    this.view.renderBuyMethodSection(this.model.lottos)
    this.view.resetPocketSection()
    this.view.resetWinningSection()
    this.#handleManual()
    this.#handleAuto()
  }

  #manageManual() {
    const manualNumbers = this.manual.manageManualInput()
    if (!manualNumbers) return

    this.model.issueManualLotto(manualNumbers)

    const generatedLottos = this.model.lottos
    if (generatedLottos.issuableCount === 0) {
      this.#managePocket()
    } else {
      this.view.renderBuyMethodSection(generatedLottos)
      this.#handleManual()
      this.#handleAuto()
    }
  }

  #managePocket() {
    this.model.issueRandomLottos(this.model.lottos.issuableCount)
    this.view.resetBuyMethodSection()
    this.view.renderPocketSection(this.model.lottos)
    this.view.renderWinningSection()
    this.#handlePocket()
    this.#handleModalOpen()
  }

  #manageModalOpen() {
    const answer = this.answer.manageAnswerInput()
    if (!answer) return

    this.model.calculateLottosResult(answer)
    this.view.renderModalSection(this.model.lottoResult, this.model.profitRate)
    this.#handleModalClose()
    this.#handleReset()
  }

  #manageModalClose() {
    this.view.toggleModalSection()
    this.model.reset()
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
