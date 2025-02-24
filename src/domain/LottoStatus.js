import { LOTTO_STATUS } from "../constants/lotto.js";
import countMatchingNumbers from "../utils/countMatchingNumbers.js";

class LottoStatus {
  #enteredLottoNumbers;
  #bonusLottoNumber;

  constructor({ enteredLottoNumbers, bonusLottoNumber }) {
    this.#enteredLottoNumbers = enteredLottoNumbers;
    this.#bonusLottoNumber = bonusLottoNumber;
  }

  getMatchedLottoStatus(issuedLottoNumbers) {
    return this.#matchLottoStatus(issuedLottoNumbers);
  }

  #matchLottoStatus(issuedLottoNumbers) {
    const matchingCounts = this.#getMatchingCounts(issuedLottoNumbers);
    const isBonusArray = this.#getHasBonusNumbers(issuedLottoNumbers);

    return matchingCounts
      .map((matchCount, index) =>
        this.#getLottoStatus(matchCount, isBonusArray[index])
      )
      .filter((status) => status);
  }

  #getMatchingCounts(issuedLottoNumbers) {
    return issuedLottoNumbers.map((numbers) =>
      countMatchingNumbers(numbers, this.#enteredLottoNumbers)
    );
  }

  #hasBonusNumber(numbers) {
    return numbers.includes(this.#bonusLottoNumber);
  }

  #getHasBonusNumbers(issuedLottoNumbers) {
    return issuedLottoNumbers.map((numbers) => this.#hasBonusNumber(numbers));
  }

  #getLottoStatus(matchCount, isBonus) {
    return LOTTO_STATUS.find(
      (status) =>
        status.COUNT === matchCount &&
        (status.IS_BONUS === null || status.IS_BONUS === isBonus)
    );
  }
}

export default LottoStatus;
