import Validator from "../validators/lotto_validator.js"
import { $, getQuotient } from "../util.js"
import { TICKET, SELECTOR } from "../constants/constant.js"
import Ticket from "../ticket.js"

class LottoController {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.validator = new Validator()
  }

  init() {
    this.view.reset()
    this.handlePrice()
    this.model.init()
  }

  getBuyInput() {
    const value = $(SELECTOR.BUY_INPUT).value
    $(SELECTOR.BUY_INPUT).value = ""

    return value
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

    const errorMessage = this.validator.checkPriceValid(price)
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
    // TODO : 입력한 당첨번호 유효성 확인
    // TODO : 입력한 당첨번호 model에 저장하기
    // TODO : 우승정보, 수익률 계산하기
    // TODO : 우승정보 가져오기
    // TODO : 수익률 정보 가져오기
    // TODO : modal template render 하기
    this.view.renderModalSection()
    // TODO : modal classList.add("open")
    // TODO : 모달창 닫기 기능 분리
    const $modalClose = document.querySelector(".modal-close")
    const $modal = document.querySelector(".modal")
    const onModalClose = () => {
      $modal.classList.remove("open")
    }
    $modalClose.addEventListener("click", onModalClose)
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
    const $showResultButton = document.querySelector(
      ".open-result-modal-button"
    )
    $showResultButton.addEventListener("click", () => {
      this.manageModal()
    })
  }
}

export default LottoController
