import Validator from "../utils/Validator";

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
