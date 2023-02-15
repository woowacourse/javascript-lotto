const Lotto = require("./Lotto");
const Random = require("../utils/Random");
const { NUMBER } = require("../constants");

class LottoGame {
  constructor(amount) {
    this.lotteries = [];
    this.generateLotteries(amount / NUMBER.UNIT);
    this.getLotteries();
  }

  generateLotteries(count) {
    for (let i = 0; i < count; i++) {
      const randomNumbers = Random.generateRandomNumbers();
      this.lotteries.push(new Lotto(randomNumbers));
    }
  }

  getLotteries() {
    return this.lotteries.map((lottery) => lottery.getLottoString());
  }
}

module.exports = LottoGame;
