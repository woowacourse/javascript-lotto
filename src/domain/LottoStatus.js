import { LOTTO_STATUS } from "../constants/lotto.js";
import countMatchingNumbers from "../utils/countMatchingNumbers.js";

class LottoStatus {
  #issuedLottoNumbers;
  #enteredLottoNumbers;
  #bonusLottoNumber;
  #matchedLottoStatus;

  constructor({ issuedLottoNumbers, enteredLottoNumbers, bonusLottoNumber }) {
    this.#issuedLottoNumbers = issuedLottoNumbers;
    this.#enteredLottoNumbers = enteredLottoNumbers;
    this.#bonusLottoNumber = bonusLottoNumber;
    this.#matchedLottoStatus = [];
    this.#matchLottoStatus();
  }

  getMatchedLottoStatus() {
    return this.#matchedLottoStatus;
  }

  #matchLottoStatus() {
    const matchingCounts = this.#getMatchingCounts();
    const isBonusArray = this.#getHasBonusNumbers();

    this.#matchedLottoStatus = matchingCounts
      .map((matchCount, index) =>
        this.#getLottoStatus(matchCount, isBonusArray[index])
      )
      .filter((status) => status);
  }

  #getMatchingCounts() {
    return this.#issuedLottoNumbers.map((numbers) => {
      return countMatchingNumbers(numbers, this.#enteredLottoNumbers);
    });
  }

  #hasBonusNumber(numbers) {
    return numbers.includes(this.#bonusLottoNumber);
  }

  #getHasBonusNumbers() {
    return this.#issuedLottoNumbers.map((numbers) => {
      return this.#hasBonusNumber(numbers);
      return this.#hasBonusNumber(numbers);
    });
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
