import { LOTTO_STATUS } from "../constants/lotto.js";

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
  }

  countMatchingNumbers(numbers) {
    return numbers.filter((number) =>
      this.#enteredLottoNumbers.includes(number)
    ).length;
  }

  getMatchingCounts() {
    return this.#issuedLottoNumbers.map((numbers) => {
      return this.countMatchingNumbers(numbers);
    });
  }

  hasBonusNumber(numbers) {
    return numbers.includes(this.#bonusLottoNumber);
  }

  getHasBonusNumbers() {
    return this.#issuedLottoNumbers.map((numbers) => {
      return this.hasBonusNumber(numbers);
    });
  }

  getLottoStatus(matchCount, isBonus) {
    if (matchCount === 5) {
      return LOTTO_STATUS.find(
        (item) => item.COUNT === matchCount && item.IS_BONUS === isBonus
      );
    }
    return LOTTO_STATUS.find((item) => item.COUNT === matchCount);
  }

  matchLottoStatus() {
    const matchingCounts = this.getMatchingCounts();
    const isBonusArray = this.getHasBonusNumbers();

    this.#matchedLottoStatus = matchingCounts
      .map((matchCount, index) =>
        this.getLottoStatus(matchCount, isBonusArray[index])
      )
      .filter((status) => status);
  }

  getMatchedLottoStatus() {
    return this.#matchedLottoStatus;
  }
}

export default LottoStatus;
