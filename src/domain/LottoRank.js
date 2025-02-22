import { LOTTO_STATUS } from "../constants/lotto.js";

class LottoRank {
  #issuedLottoNumbers;
  #matchedLottoStatus;

  constructor(issuedLottoNumbers) {
    this.#issuedLottoNumbers = issuedLottoNumbers;
    this.#matchedLottoStatus = [];
  }

  updateStatus(callback) {
    const currentStatus = LOTTO_STATUS.find(callback);
    this.#matchedLottoStatus.push(currentStatus);
  }

  getSameNumbers(numbers, enteredLottoNumbers) {
    return numbers.filter((number) => enteredLottoNumbers.includes(number))
      .length;
  }

  hasBonusNumber(numbers, bonusNumber) {
    return numbers.includes(bonusNumber);
  }

  getMatchingNumbers(enteredLottoNumbers) {
    return this.#issuedLottoNumbers.map((numbers) => {
      return this.getSameNumbers(numbers, enteredLottoNumbers);
    });
  }

  getHasBonusNumbers(bonusLottoNumbers) {
    return this.#issuedLottoNumbers.map((numbers) => {
      return this.hasBonusNumber(numbers, bonusLottoNumbers);
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

  calculateRank(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);

    this.updateFinalStatus(matchingNumbers, isBonusArray);
  }

  getMatchedLottoStatus() {
    return this.#matchedLottoStatus;
  }
}

export default LottoRank;
