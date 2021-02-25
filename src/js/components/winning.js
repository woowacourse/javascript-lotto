import { SELECTOR } from "../constants/constant.js"
import { $, $$ } from "../util.js"

export const getAnswerInput = () => {
  const numbers = [...$$(SELECTOR.WINNING_NUMBER)].map(({ value }) =>
    value === "" ? NaN : Number(value)
  )
  const bonus =
    $(SELECTOR.BOUNS_NUMBER).value === ""
      ? NaN
      : Number($(SELECTOR.BOUNS_NUMBER).value)

  return [numbers, bonus]
}
