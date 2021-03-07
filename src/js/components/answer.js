import { SELECTOR } from "../constants/constant.js"
import { $, $$ } from "../util.js"
import { checkLottoNumberValid } from "../validators/validator.js"

class Answer {
  #getAnswerInput() {
    const numbers = [...$$(SELECTOR.WINNING_NUMBER)].map(({ value }) =>
      value === "" ? NaN : Number(value)
    )
    const bonus =
      $(SELECTOR.BONUS_NUMBER).value === ""
        ? NaN
        : Number($(SELECTOR.BONUS_NUMBER).value)

    return { numbers, bonus }
  }

  manageAnswerInput() {
    const { numbers, bonus } = this.#getAnswerInput()
    const lottos = [...numbers, bonus]
    const errorMessage = checkLottoNumberValid(lottos)
    if (errorMessage) {
      return alert(errorMessage)
    }

    return { numbers, bonus }
  }
}

export default Answer
