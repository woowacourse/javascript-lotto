import { getBuyInput } from "../components/buy.js"
import { getTicketsCount } from "../components/pocket.js"
import { getAnswerInput } from "../components/winning.js"
import { $ } from "../util.js"
import { SELECTOR } from "../constants/constant.js"
import { checkAnswerValid, checkPriceValid } from "../validators/validator.js"

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

  #manageLotto() {
    const price = getBuyInput()
    const errorMessage = checkPriceValid(price)
    errorMessage && alert(errorMessage)

    for (let i = 0; i < getTicketsCount(price); i++) {
      this.model.generateRandomTicket()
    }
    this.#managePocket()
  }

  #managePocket() {
    const tickets = this.model.tickets
    this.view.renderPocketSection(tickets)
    this.view.renderWinningSection()
    this.#handlePocket()
    this.#handleModalOpen()
  }

  #manageModalOpen() {
    const { numbers, bonus } = getAnswerInput()
    const errorMessage = checkAnswerValid(numbers, bonus)
    errorMessage && alert(errorMessage)

    this.model.calculateLottosResult(numbers, bonus)
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
      this.#manageLotto()
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
