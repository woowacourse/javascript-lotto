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

  getHasBonusNumbers(enteredLottoNumbers) {
    return this.issuedLottoNumbers.map((lotto) => {
      return lotto.hasBonusNumber(enteredLottoNumbers);
    });
  }

  getMatchedLottoRank(enteredLottoNumbers) {
    const matchingNumbers = this.getMatchingNumbers(enteredLottoNumbers);
    const isBonusArray = this.getHasBonusNumbers(enteredLottoNumbers);

    return matchingNumbers.map((matchingNumber, index) => {
      return LOTTO_STATUS.find((status) => {
        if (status.COUNT === 5 && matchingNumber === 5 && isBonusArray[index])
          return true;

        if (status.COUNT === matchingNumber) return true;
      });
    });
  }
}

export default LottoMachine;
