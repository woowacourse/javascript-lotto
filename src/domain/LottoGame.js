const Lotto = require("./Lotto");
const Random = require("../utils/Random");
const { NUMBER, PRIZE } = require("../constants");

class LottoGame {
  constructor(amount) {
    this.lotteries = [];
    this.rank = new Array(NUMBER.RANK).fill(0);
    this.generateLotteries(amount / NUMBER.UNIT);
    this.getLotteries();
  }

  generateLotteries(count) {
    Array.from({ length: count }, () => {
      const randomNumbers = Random.generateRandomNumbers();
      this.lotteries.push(new Lotto(randomNumbers));
    });
  }

  getLotteries() {
    return this.lotteries.map((lottery) => lottery.getLottoString());
  }

  matchLotteries(lottoNumbers, bonusNumber) {
    const lottoResult = this.lotteries.map((lotto) => {
      return [lotto.matchNumbers(lottoNumbers), lotto.matchBonus(bonusNumber)];
    });
    return lottoResult;
  }

  calculateRankResult(lottoNumbers, bonusNumber) {
    const matchResult = this.matchLotteries(lottoNumbers, bonusNumber);
    const rankResult = new Array(NUMBER.RANK).fill(0);

    matchResult.map((lotto) => {
      rankResult[this.calculateRank(lotto[0], lotto[1])] += 1;
    });

    return this.calculateProfit(rankResult);
  }

  calculateRank(matchNumber, bonusNumber) {
    if (matchNumber > 9) return;
    if (matchNumber === 6) return 10 - matchNumber;
    if (matchNumber === 7 && bonusNumber) return 10 - matchNumber;
    return 9 - matchNumber;
  }

  calculateProfit(rankResult) {
    let prize = 0;
    rankResult.forEach((_, idx) => {
      prize += PRIZE[idx] * rankResult[idx];
    });
    const profit = ((prize / (this.lotteries.length * 1000)) * 100).toFixed(1);
    return [...rankResult, profit];
  }
}

module.exports = LottoGame;
