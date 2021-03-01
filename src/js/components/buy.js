import { checkPriceValid } from "../validators/validator.js"
import { SELECTOR, TICKET } from "../constants/constant.js"
import { $, getQuotient } from "../util.js"

class Buy {
  #getBuyInput() {
    const value = $(SELECTOR.BUY_INPUT).value
    $(SELECTOR.BUY_INPUT).value = ""

    return Number(value)
  }

  manageBuyInput() {
    const price = this.#getBuyInput()
    const errorMessage = checkPriceValid(price)
    if (errorMessage) {
      return alert(errorMessage)
    }

    return price
  }

  getTicketsCount(price) {
    return getQuotient(price, TICKET.PRICE)
  }
}

export default Buy
