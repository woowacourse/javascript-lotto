import LottoModel from "../models/lotto_model.js"
import LottoView from "../views/lotto_view.js"
import Validator from "../validators/lotto_validator.js"
import { $, getQuotient } from "../util.js"
import { TICKET, SELECTOR } from "../constants/constant.js"
import Ticket from "../ticket.js"

class LottoController {
  constructor() {
    this.model = new LottoModel()
    this.view = new LottoView()
    this.validator = new Validator()
  }

  init() {
    this.view.reset()
    this.handlePrice()
    this.model.init()
  }

  getAndClearBuyValue() {
    const value = $(SELECTOR.BUY_INPUT).value
    $(SELECTOR.BUY_INPUT).value = ""

    return value
  }

  getCount(price) {
    return getQuotient(price, TICKET.PRICE)
  }

  renderPocketLottos() {
    const lottos = this.model.lottos
    const pocketDetail = this.model.detail
    this.view.renderPocketLottos(lottos, pocketDetail)
  }

  managePocket() {
    const amount = this.model.amount
    this.view.renderPocketSection(amount)
    this.handlePocket()
    this.renderPocketLottos()
    this.view.renderWinningSection()
    this.manageModal()
  }

  manageLotto() {
    const price = Number(this.getAndClearBuyValue())
    const alertMessage = this.validator.isPriceValid(price)

    if (alertMessage !== null) {
      return alert(alertMessage)
    }

    const count = this.getCount(price)
    for (let i = 0; i < count; i++) {
      const ticket = new Ticket()
      ticket.generateRandomNumbers()
      this.model.addLotto(ticket)
    }
    this.managePocket()
  }

  manageDetail() {
    this.model.toggleDetail()
    this.renderPocketLottos()
  }

  manageModal() {
    const $showResultButton = document.querySelector(
      ".open-result-modal-button"
    )
    const $modalClose = document.querySelector(".modal-close")
    const $modal = document.querySelector(".modal")
    const $lottoNumbersToggleButton = document.querySelector(
      ".lotto-numbers-toggle-button"
    )

    const onModalShow = () => {
      $modal.classList.add("open")
    }

    const onModalClose = () => {
      $modal.classList.remove("open")
    }

    $showResultButton.addEventListener("click", onModalShow)
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
      this.manageDetail()
    })
  }
}

export default LottoController
