import { LOTTO_STATUS } from "../constants/lotto";
//TODO: depth 줄이기

class LottoMachine {
  issuedLottoNumbers;

  constructor(issuedLottoNumbers) {
    this.issuedLottoNumbers = issuedLottoNumbers;
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

  getMatchedLottoRank(enteredLottoNumbers, bonusLottoNumber) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(bonusLottoNumber);

    return matchingNumbers.map((matchingNumber, index) => {
      return LOTTO_STATUS.find((status) => {
        if (
          status.COUNT === matchingNumber &&
          isBonusArray[index] === status.IS_BONUS
        ) {
          return true;
        }
      });
    });
  }
}

export default LottoMachine;
