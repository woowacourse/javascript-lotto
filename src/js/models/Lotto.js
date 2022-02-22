import { isValidNumber, isValidLength } from "../utils/validator";

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  static create(lottoNumbers) {
    if (isValidNumber(lottoNumbers) && isValidLength(lottoNumbers)) {
      return new Lotto(lottoNumbers);
    }
    throw new Error("잘못된 입력 값");
  }

  lottoScore(winNumber) {}
}

export default Lotto;
