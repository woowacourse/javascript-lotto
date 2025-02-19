import { PURCHASE_UNIT } from "./const";
import Lotto from "./Lotto";

class LottoManager {
  #userLottos;
  #winningNumber;
  #bonusNumber;

  constructor(userLottos, winningNumber, bonusNumber) {
    this.#userLottos = userLottos;
    this.#winningNumber = winningNumber;
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumberUnique() {
    if (this.#winningNumber.includes(this.#bonusNumber))
      throw new Error("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  }

  #compareMatchingNumbers(userLotto) {
    return userLotto.reduce((acc, lottoNumber) => {
      if (this.#winningNumber.includes(lottoNumber)) {
        acc += 1;
      }
      return acc;
    }, 0);
  }

  countMatchingNumbers() {
    const countResults = [];

    this.#userLottos.forEach((userLotto) => {
      const matchingCount = this.#compareMatchingNumbers(userLotto);
      if (matchingCount >= 3) countResults.push(matchingCount);
    });

    return countResults;
  }

  containsBonusNumbers(countResults) {
    const isContainBonusInFive = countResults.reduce((acc, cur, index) => {
      if (cur === 5) {
        acc.push(this.#userLottos[index].includes(this.#bonusNumber));
      }
      return acc;
    }, []);
    return isContainBonusInFive;
  }

  #switchCountToPrize(countResult, isBonusNumber) {
    switch (countResult) {
      case 3:
        return "fifthPrize";
      case 4:
        return "fourthPrize";
      case 5:
        if (isBonusNumber) return "secondPrize";
        return "thirdPrize";
      case 6:
        return "firstPrize";
    }
  }

  calculateWinnings(countResults, isContainBonusNumbers) {
    let prizeResult = {
      firstPrize: 0,
      secondPrize: 0,
      thirdPrize: 0,
      fourthPrize: 0,
      fifthPrize: 0,
    };

    countResults.reduce((acc, cur) => {
      let isBonusNumber;
      if (cur === 5) isBonusNumber = isContainBonusNumbers.shift();
      acc[this.#switchCountToPrize(cur, isBonusNumber)] += 1;
      return acc;
    }, prizeResult);

    return prizeResult;
  }
}

export default LottoManager;
