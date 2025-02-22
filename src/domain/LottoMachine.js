import { LOTTO_STATUS } from "../constants/lotto.js";

class LottoMachine {
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

  getMatchingNumbers(enteredLottoNumbers) {
    return this.#issuedLottoNumbers.map((lotto) => {
      return lotto.getSameNumbersLength(enteredLottoNumbers);
    });
  }

  getHasBonusNumbers(bonusLottoNumbers) {
    return this.#issuedLottoNumbers.map((lotto) => {
      return lotto.hasNumber(bonusLottoNumbers);
    });
  }

  updateAllLottoStatus(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);

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

  getMatchedLottoStatus() {
    return this.#matchedLottoStatus;
  }
}

export default LottoMachine;
