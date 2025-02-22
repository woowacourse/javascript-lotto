import { PRIZE } from "../config/const.js";

class LottoComparer {
  #userLottos;
  #winningNumber;
  #bonusNumber;

  constructor(userLottos, winningLotto) {
    this.#userLottos = userLottos;
    this.#winningNumber = winningLotto.winningNumbers;
    this.#bonusNumber = winningLotto.bonusNumber;
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
    return this.#userLottos.reduce((acc, cur, index) => {
      const matchingCount = this.#compareMatchingNumbers(cur.numbers);
      if (matchingCount < PRIZE.MIN_MATCH_COUNT) return acc;
      const isBonus = this.#userLottos[index].numbers.includes(
        this.#bonusNumber
      );
      if (matchingCount === PRIZE.BONUS_MATCH_COUNT && isBonus) {
        acc.push("bonus");
        return acc;
      }
      acc.push(matchingCount);
      return acc;
    }, []);
  }
}

export default LottoComparer;
