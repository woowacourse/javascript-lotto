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
    const countResults = [];

    this.#userLottos.forEach((userLotto) => {
      const matchingCount = this.#compareMatchingNumbers(userLotto.numbers);
      if (matchingCount >= 3) countResults.push(matchingCount);
    });

    return countResults;
  }

  containsBonusNumbers(countResults) {
    const isContainBonusInFive = countResults.reduce((acc, cur, index) => {
      if (cur === 5) {
        acc.push(this.#userLottos[index].numbers.includes(this.#bonusNumber));
      }
      return acc;
    }, []);
    return isContainBonusInFive;
  }
}

export default LottoComparisonManager;
