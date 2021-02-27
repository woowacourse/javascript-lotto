import { SELECTOR } from "../constants/constant.js"
import { $ } from "../util.js"

export const getBuyInput = () => {
  const value = $(SELECTOR.BUY_INPUT).value
  $(SELECTOR.BUY_INPUT).value = ""

  return Number(value)
}
