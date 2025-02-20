class LottoComparisonManager {
  #userLottos;
  #winningNumber;
  #bonusNumber;

  constructor(userLottos, winningNumber, bonusNumber) {
    this.#userLottos = userLottos;
    this.#winningNumber = winningNumber;
    this.#bonusNumber = bonusNumber;
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
      if (matchingCount < 3) return acc;
      const isBonus = this.#userLottos[index].numbers.includes(
        this.#bonusNumber
      );
      if (matchingCount === 5 && isBonus) {
        acc.push("bonus");
        return acc;
      }
      acc.push(matchingCount);
      return acc;
    }, []);
  }
}

export default LottoComparisonManager;
