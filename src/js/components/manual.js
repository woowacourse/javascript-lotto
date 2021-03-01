import { $$ } from "../util.js"
import { checkLottoNumberValid } from "../validators/validator.js"

class Manual {
  #getManualInput() {
    const numbers = [...$$(".manual-number")].map(({ value }) => {
      return value === "" ? NaN : Number(value)
    })

    return numbers
  }

  manageManualInput() {
    const manualNumbers = this.#getManualInput()
    const errorMessage = checkLottoNumberValid(manualNumbers)
    if (errorMessage) {
      return alert(errorMessage)
    }

    return manualNumbers
  }
}

export default Manual
