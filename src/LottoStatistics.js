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

  matchSameCount(machineLotto, winningLotto) {
    return machineLotto.filter((number) => winningLotto.includes(number)).length;
  }
}

export default LottoStatistics;
