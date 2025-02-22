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

  updateStatus(callback) {
    const currentStatus = LOTTO_STATUS.find(callback);
    this.#matchedLottoStatus.push(currentStatus);
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

  updateFinalStatus(matchingNumbers, isBonusArray) {
    matchingNumbers.forEach((matchingNumber, index) => {
      if (matchingNumber < 3) return;

      if (matchingNumber === 5 && isBonusArray[index]) {
        this.updateStatus((status) => status.COUNT === 5 && status.IS_BONUS);
        return;
      }

      this.updateStatus(
        (status) => status.COUNT === matchingNumber && !status.IS_BONUS
      );
    });
  }

  calculateRanks() {
    const matchingNumbers = this.getMatchingCounts();
    const isBonusArray = this.getHasBonusNumbers();

    this.updateFinalStatus(matchingNumbers, isBonusArray);
  }

  getMatchedLottoStatus() {
    return this.#matchedLottoStatus;
  }
}

export default LottoStatus;
