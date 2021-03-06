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

  #savePrice() {
    const price = this.buy.getPrice()
    if (!price) return

    this.model.issueLottos(this.buy.getTicketsCount(price))
    this.#showBuyMethod(this.model.lottos)
  }

  #saveManualNumbers() {
    const manualNumbers = this.manual.getManualNumbers()
    if (!manualNumbers) return

    this.model.lottos.generateManualTicket(manualNumbers)
    const generatedLottos = this.model.lottos
    if (generatedLottos.issuableCount === 0) {
      this.#showPocket()
    } else {
      this.#showBuyMethod(generatedLottos)
    }
  }

  #saveAnswerInput() {
    const answer = this.answer.manageAnswerInput()
    if (!answer) return

    this.model.calculateLottosResult(answer)
    this.#showResultModal()
  }

  #issueRemainingCount() {
    this.model.lottos.generateRandomTickets()
    this.#showPocket()
  }

  #showBuyMethod(lottos) {
    this.view.renderBuyMethodSection(lottos)
    this.view.resetPocketSection()
    this.view.resetWinningSection()
    this.#handleManual()
    this.#handleAuto()
  }

  #showPocket() {
    this.view.resetBuyMethodSection()
    this.view.renderPocketSection(this.model.lottos)
    this.view.renderWinningSection()
    this.#handlePocket()
    this.#handleModalOpen()
  }

  #showResultModal() {
    this.view.renderModalSection(this.model.lottoResult, this.model.profitRate)
    this.#handleModalClose()
    this.#handleReset()
  }

  #hideResultModal() {
    this.view.toggleModalSection()
    this.model.reset()
  }

  #handlePrice() {
    const $buyButton = $(SELECTOR.BUY_BUTTON)
    $buyButton.addEventListener("click", () => {
      this.#savePrice()
    })
  }

  #handleManual() {
    const $manualButton = $("#manual-button")
    $manualButton.addEventListener("click", () => {
      this.#saveManualNumbers()
    })
  }

  #handleAuto() {
    const $autoButton = $("#auto-button")
    $autoButton.addEventListener("click", () => {
      this.model.lottos.generateRandomTickets()
      this.#issueRemainingCount()
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
      this.#saveAnswerInput()
    })
  }

  #handleModalClose() {
    const $modalClose = $(SELECTOR.MODAL_CLOSE)
    $modalClose.addEventListener("click", () => {
      this.#hideResultModal()
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
