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
      countResults.push(matchingCount);
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
}

export default LottoManager;
