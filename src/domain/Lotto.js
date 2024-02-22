import Validator from "../utils/Validator";

export const LOTTO_LENGTH = 6;

class Lotto {
  _numbers;

  constructor(numbers) {
    if (!Validator.checkLottoNumbers(numbers)) throw new Error();

    this._numbers = numbers;
  }

  get numbers() {
    return [...this._numbers];
  }
}

export default Lotto;
