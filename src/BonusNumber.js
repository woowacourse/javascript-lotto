import ERROR_MESSAGE from "./constant/error.js";

class BonusNumber {
  #number;

  constructor(numberInput, numbers) {
    this.#validateNumber(numberInput, numbers);
  }

  #validateNumber(numberInput, numbers) {
    const number = Number(numberInput);
    if (isNaN(number)) throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    if (number < 1 || number > 45) throw new Error(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
    if (numbers.includes(number)) throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
  }
}

export default BonusNumber;