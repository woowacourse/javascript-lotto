const Lotto = require("./Lotto");
const Random = require("../utils/Random");
const {
  UNIT,
  RANK,
  PRIZE,
  LOTTO_SIZE,
  LOTTO_RANGE,
  MATCH,
} = require("../constants");

class LottoGame {
  constructor(amount) {
    this.lotteries = [];
    this.rank = new Array(RANK).fill(0);
    this.generateLotteries(amount / UNIT);
    this.getLotteries();
  }

  generateLotteries(count) {
    Array.from({ length: count }, () => {
      const randomNumbers = [];
      while (randomNumbers.length < LOTTO_SIZE) {
        const randomNumber = this.setRandomNumber();
        this.checkDuplicated(randomNumbers, randomNumber);
      }
      this.lotteries.push(new Lotto(randomNumbers));
    });
  }

  checkDuplicated(randomNumbers, randomNumber) {
    if (!Random.isDuplicated(randomNumbers, randomNumber))
      randomNumbers.push(randomNumber);
  }

  setRandomNumber() {
    return Random.generateRandomNumber(LOTTO_RANGE.MIN, LOTTO_RANGE.MAX);
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
    const rankResult = new Array(RANK).fill(0);

    matchResult.map((lotto) => {
      rankResult[this.calculateRank(lotto[0], lotto[1])] += 1;
    });

    return this.calculateProfit(rankResult);
  }

  calculateRank(matchNumber, bonusNumber) {
    if (matchNumber > MATCH.UNDER_THREE) return;
    if (
      matchNumber === MATCH.ALL ||
      (matchNumber === MATCH.FIVE && bonusNumber)
    )
      return MATCH.INDEX_FIRST_SECOND(matchNumber);
    return MATCH.MATCH_INDEX(matchNumber);
  }

  calculateProfit(rankResult) {
    const prize = rankResult.reduce(
      (sum, curRank, idx) => sum + PRIZE[idx] * curRank,
      0
    );
    const profit = ((prize / (this.lotteries.length * UNIT)) * 100).toFixed(1);
    return [...rankResult, profit];
  }
}

module.exports = LottoGame;
