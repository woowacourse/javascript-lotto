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
    const numbers = [...$$(".winning-number")].map(({ value }) =>
      value === "" ? NaN : Number(value)
    )
    const bonus =
      $(".bonus-number").value === "" ? NaN : Number($(".bonus-number").value)

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

  manageModal() {
    const [numbers, answer] = this.getAnswerInput()
    const errorMessage = checkAnswerValid(numbers, answer)
    if (errorMessage) {
      return alert(errorMessage)
    }

    // TODO : 입력한 당첨번호 유효성 확인
    // TODO : 입력한 당첨번호 model에 저장하기
    // TODO : 우승정보, 수익률 계산하기
    // TODO : 우승정보 가져오기
    // TODO : 수익률 정보 가져오기

    this.view.renderModalSection()
    this.handleModalClose()
    this.handleReset()
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
    const $showResultButton = $(".open-result-modal-button")
    $showResultButton.addEventListener("click", () => {
      this.manageModal()
      console.log(this.getAnswerInput())
    })
  }

  handleModalClose() {
    const $modalClose = $(".modal-close")
    $modalClose.addEventListener("click", () => {
      this.view.toggleModalSection()
    })
  }

  handleReset() {
    const $resetButton = $("#reset")
    $resetButton.addEventListener("click", () => {
      this.reset()
    })
  }
}

export default LottoController
