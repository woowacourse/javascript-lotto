import { LOTTO_STATUS } from "../constants/lotto.js";

class LottoMachine {
  issuedLottoNumbers;

  constructor(issuedLottoNumbers) {
    this.issuedLottoNumbers = issuedLottoNumbers;
    this.matchedLottoStatus = [];
  }

  updateStatus(callback) {
    const currentStatus = LOTTO_STATUS.find(callback);
    this.matchedLottoStatus.push(currentStatus);
  }

  getMatchingNumbers(enteredLottoNumbers) {
    return this.issuedLottoNumbers.map((lotto) => {
      return lotto.getSameNumbers(enteredLottoNumbers);
    });
  }

  getHasBonusNumbers(bonusLottoNumbers) {
    return this.issuedLottoNumbers.map((lotto) => {
      return lotto.hasBonusNumber(bonusLottoNumbers);
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

  getMatchedLottoStatus(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);

    this.updateFinalStatus(matchingNumbers, isBonusArray);

    return this.matchedLottoStatus;
  }
}

export default LottoMachine;
