import { PURCHASE_UNIT } from "./const";
import Lotto from "./Lotto";

class LottoManager {
  #price;
  #lottos;

  constructor(price) {
    this.#price = price;
    this.#lottos = [];
  }

  generateLottos() {
    for (let i = 0; i < this.#price / PURCHASE_UNIT; i++) {
      const numbers = [1, 2, 3, 4, 5, 6]; //TODO
      this.#lottos.push(new Lotto(numbers));
    }
  }

  get lottos() {
    return this.#lottos;
  }

  validateBonusNumberUnique(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber))
      throw new Error("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  }

  #compareMatchingNumbers(userLotto, winningNumber) {
    return userLotto.reduce((acc, lottoNumber) => {
      if (winningNumber.includes(lottoNumber)) {
        acc += 1;
      }
      return acc;
    }, 0);
  }

  #switchMatchCount = (count) => {
    switch (count) {
      case 3:
        return "threeMatch";
      case 4:
        return "fourMatch";
      case 5:
        return "fiveMatch";
      case 6:
        return "sixMatch";
      default:
        return;
    }
  };

  countMatchingNumbers(userLottos, winningNumber) {
    let countResults = {
      threeMatch: 0,
      fourMatch: 0,
      fiveMatch: 0,
      sixMatch: 0,
    };

    userLottos.forEach((userLotto) => {
      const matchingCount = this.#compareMatchingNumbers(
        userLotto,
        winningNumber
      );

      if (matchingCount >= 3) {
        const count = this.#switchMatchCount(matchingCount);
        countResults[count] += 1;
      }
    });

    return countResults;
  }
}

export default LottoManager;
