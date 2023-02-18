const Lotto = require("./Lotto");
const Random = require("../utils/Random");
const { NUMBER, PRIZE } = require("../constants");
const Calculation = require("../utils/calculation");

class LottoGame {
  constructor(amount) {
    this.lotteries = [];
    this.rank = new Array(NUMBER.RANK).fill(0);
    this.generateLotteries(amount / NUMBER.UNIT);
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

  getRankResult(lottoNum, bonus) {
    const rank = new Array(NUMBER.RANK).fill(0);
    this.lotteries.forEach((lotto) => {
      rank[
        this.getRank(lotto.matchNumbers(lottoNum), lotto.matchBonus(bonus))
      ]++;
    });
    return [...rank, Calculation.getProfit(rank, this.lotteries.length)];
  }

  getRank(matchNumber, bonusNumber) {
    if (matchNumber > 9) return;
    if (matchNumber === 6 || (matchNumber === 7 && bonusNumber))
      return 10 - matchNumber;
    return 9 - matchNumber;
  }
}

module.exports = LottoGame;
