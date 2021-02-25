import { $, $$, getQuotient } from "../util.js"
import { TICKET, SELECTOR } from "../constants/constant.js"
import Ticket from "../ticket.js"
import { checkAnswerValid, checkPriceValid } from "../validators/validator.js"

class LottoController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  init() {
    this.model.init()
    this.view.init()
    this.handlePrice()
  }

  reset() {
    this.model.init()
    this.view.reset()
    this.handlePrice()
  }

  getBuyInput() {
    const value = $(SELECTOR.BUY_INPUT).value
    $(SELECTOR.BUY_INPUT).value = ""

    return value
  }

  getAnswerInput() {
    const numbers = [...$$(SELECTOR.WINNING_NUMBER)].map(({ value }) =>
      value === "" ? NaN : Number(value)
    )
    const bonus =
      $(SELECTOR.BOUNS_NUMBER).value === ""
        ? NaN
        : Number($(SELECTOR.BOUNS_NUMBER).value)

    return [numbers, bonus]
  }

  getCount(price) {
    return getQuotient(price, TICKET.PRICE)
  }

  managePocket() {
    const lottos = this.model.lottos
    this.view.renderPocketSection(lottos)
    this.handlePocket()
    this.view.renderWinningSection()
    this.handleModalOpen()
  }

  manageLotto() {
    const price = Number(this.getBuyInput())

    const errorMessage = checkPriceValid(price)
    if (errorMessage) {
      return alert(errorMessage)
    }

    const count = this.getCount(price)
    for (let i = 0; i < count; i++) {
      const ticket = new Ticket()
      ticket.generateRandomNumbers()
      this.model.addLotto(ticket)
    }
    this.managePocket()
  }

  manageModalOpen() {
    const [numbers, answer] = this.getAnswerInput()
    const errorMessage = checkAnswerValid(numbers, answer)
    if (errorMessage) {
      return alert(errorMessage)
    }

    this.model.addAnswerLotto(numbers, answer)
    this.model.calculateLottosResult()
    const lottoResult = this.model.lottoResult
    const profit = this.model.profit
    this.view.renderModalSection(lottoResult, profit)
    this.handleModalClose()
    this.handleReset()
  }

  manageModalClose() {
    this.view.toggleModalSection()
    this.model.resetLottoResult()
  }

  handlePrice() {
    const $buyButton = $(SELECTOR.BUY_BUTTON)
    $buyButton.addEventListener("click", () => {
      this.manageLotto()
    })
  }

  handlePocket() {
    const $pocketButton = $(SELECTOR.POCKET_TOGGLE)
    $pocketButton.addEventListener("click", () => {
      this.view.togglePocketDetail()
    })
  }

  handleModalOpen() {
    const $showResultButton = $(SELECTOR.OPEN_RESULT_MODAL_BUTTON)
    $showResultButton.addEventListener("click", () => {
      this.manageModalOpen()
    })
  }

  handleModalClose() {
    const $modalClose = $(SELECTOR.MODAL_CLOSE)
    $modalClose.addEventListener("click", () => {
      this.manageModalClose()
    })
  }

  handleReset() {
    const $resetButton = $(SELECTOR.RESET_BUTTON)
    $resetButton.addEventListener("click", () => {
      this.reset()
    })
  }
}

export default LottoController
