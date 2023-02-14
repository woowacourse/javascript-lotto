const Lotto = require("./Lotto");

class LottoGame {
  // lotteries ;
  constructor() {
    this.lotteries = [];
  }

  generateLotteries(num) {
    for (let i = 0; i < num; i++) {
      this.lotteries.push(new Lotto());
    }
  }
}

module.exports = LottoGame;
