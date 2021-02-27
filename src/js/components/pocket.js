import { getQuotient } from "../util.js"
import { TICKET } from "../constants/constant.js"

export const getTicketsCount = (price) => {
  return getQuotient(price, TICKET.PRICE)
}
