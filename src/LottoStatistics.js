class LottoStatistics {
  #rankResult;

  constructor() {
    this.#rankResult = {
      '3개 일치': { count: 0, price: 5000 },
      '4개 일치': { count: 0, price: 50000 },
      '5개 일치': { count: 0, price: 1500000 },
      '5개 일치, 보너스 볼 일치': { count: 0, price: 30000000 },
      '6개 일치': { count: 0, price: 2000000000 },
    };
  }

  getRankResult() {
    return this.#rankResult;
  }

  compareLottos(machineLottos, winningNumber) {
    machineLottos.forEach((machineLotto) => {
      const sameCount = this.matchSameCount(machineLotto, winningNumber.lotto);
    });
  }

  hasBonusNumber(machineLotto, bonus) {
    return machineLotto.includes(bonus);
  }

  matchSameCount(machineLotto, winningLotto) {
    return machineLotto.filter((number) => winningLotto.includes(number)).length;
  }

  increaseCount(sameCount) {
    this.#rankResult[`${sameCount}개 일치`].count += 1;
  }
}

export default LottoStatistics;
