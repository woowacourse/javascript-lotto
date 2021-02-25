import { getQuotient } from "../util.js"
import { TICKET } from "../constants/constant.js"

export const getCount = (price) => {
  return getQuotient(price, TICKET.PRICE)
}
