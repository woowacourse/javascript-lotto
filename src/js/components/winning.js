import { SELECTOR } from "../constants/constant.js"
import { $, $$ } from "../util.js"

export const getAnswerInput = () => {
  const numbers = [...$$(SELECTOR.WINNING_NUMBER)].map(({ value }) =>
    value === "" ? NaN : Number(value)
  )
  const bonus =
    $(SELECTOR.BONUS_NUMBER).value === ""
      ? NaN
      : Number($(SELECTOR.BONUS_NUMBER).value)

  return [numbers, bonus]
}
