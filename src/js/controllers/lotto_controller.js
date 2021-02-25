import { getBuyInput } from "../components/buy.js"
import { getCount } from "../components/pocket.js"
import { getAnswerInput } from "../components/winning.js"
import { $ } from "../util.js"
import { SELECTOR } from "../constants/constant.js"
import Ticket from "../components/ticket.js"
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

  #managePocket() {
    const tickets = this.model.tickets
    this.view.renderPocketSection(tickets)
    this.#handlePocket()
    this.view.renderWinningSection()
    this.#handleModalOpen()
  }

  #manageLotto() {
    const price = Number(getBuyInput())

    const errorMessage = checkPriceValid(price)
    if (errorMessage) {
      return alert(errorMessage)
    }

    const count = getCount(price)
    for (let i = 0; i < count; i++) {
      const ticket = new Ticket()
      ticket.generateRandomNumbers()
      this.model.addTicket(ticket)
    }
    this.#managePocket()
  }

  #manageModalOpen() {
    const [numbers, answer] = getAnswerInput()
    const errorMessage = checkAnswerValid(numbers, answer)
    if (errorMessage) {
      return alert(errorMessage)
    }

    this.model.addAnswerLotto(numbers, answer)
    this.model.calculateLottosResult()
    const lottoResult = this.model.lottoResult
    const profitRate = this.model.profitRate
    this.view.renderModalSection(lottoResult, profitRate)
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
