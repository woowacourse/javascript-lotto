import LottoModel from "./model.js"
import LottoView from "./view.js"
import Lotto from "./lotto.js"
import { checkPriceValid } from "./validator.js"
import { $ } from "../utils/util.js"
import { LOTTO, SELECTOR } from "../constants/constant.js"

class LottoController {
  constructor() {
    this.model = new LottoModel()
    this.view = new LottoView()
  }

  init() {
    this.model.init()
    this.view.reset()
    this.handlePrice()
  }

  getBuyInput() {
    const value = $(SELECTOR.BUY_INPUT).value
    $(SELECTOR.BUY_INPUT).value = ""

    return value
  }

  getLottoCount(price) {
    return Math.floor(price / LOTTO.PRICE)
  }

  managePocket() {
    const lottos = this.model.lottos
    const amount = this.model.amount
    this.view.renderPocketSection(amount)
    this.view.renderPocketLottos(lottos)
    this.view.renderWinningSection()
    this.handlePocket()
  }

  manageLotto() {
    const price = Number(this.getBuyInput())
    const alertMessage = checkPriceValid(price)
    if (alertMessage !== null) {
      return alert(alertMessage)
    }

    const count = this.getLottoCount(price)
    this.model.init()
    for (let i = 0; i < count; i++) {
      const newLotto = new Lotto()
      newLotto.gernerateRandomNumbers()
      this.model.addLotto(newLotto.getNumbers())
    }
    this.managePocket()
  }

  togglePocketDetail() {
    const lottos = this.model.lottos
    this.view.togglePocketLottos()
    this.view.renderPocketLottos(lottos)
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
      this.togglePocketDetail()
    })
  }
}

export default LottoController
