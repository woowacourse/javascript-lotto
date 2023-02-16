const LottoGame = require("../domain/LottoGame");
const InputView = require("../view/inputView");
const OutputView = require("../view/outputView");

const LottoController = {
  /** @type {LottoGame} */
  lottoGame: undefined,

  async playLotto() {
    this.lottoGame = new LottoGame();
    await this.purchaseLotto();
    await this.LotteryTicket();
    await this.restart();
  },

  async purchaseLotto() {
    const money = await this.readMoney();

    this.lottoGame.makeLottos(money);

    OutputView.printLottoCount(this.lottoGame.lottoCount);
    OutputView.printPurchaseLottos(this.lottoGame.lottos);
  },

  async LotteryTicket() {
    const winningNumbers = await this.readWinningNumbers();
    const bonusNumber = await this.readBonusNumber(winningNumbers);

    this.lottoGame.makeWinLotto(winningNumbers, bonusNumber);
    this.lottoGame.calculateRankResult();
    const revenue = this.lottoGame.returnRevenueRate();

    OutputView.printRankResult(this.lottoGame.rankResult);
    OutputView.printRevenue(revenue);
  },

  async restart() {
    try {
      const command = await InputView.readCommandRestart();
      if (command != "y" && command != "n") throw new Error();
      if (command === "y") this.playLotto();
      return command === "y" ? this.playLotto() : InputView.close();
    } catch (e) {
      return this.restart();
    }
  },

  async readMoney() {
    try {
      const money = await InputView.readMoney();
      if (!this.validateMoney(money)) throw new Error();
      return money;
    } catch (e) {
      return this.readMoney();
    }
  },

  async readWinningNumbers() {
    try {
      const input = await InputView.readWinningNumbers();
      const winningNumbers = input.split(",").map((num) => parseInt(num));
      if (!this.validateWinningNumber(winningNumbers)) throw new Error();
      return winningNumbers;
    } catch (e) {
      return this.readWinningNumbers();
    }
  },

  async readBonusNumber(winLotto) {
    try {
      const input = await InputView.readBonusNumber();
      const bonusNumber = parseInt(input);
      if (!this.validateBonusNumber(winLotto, bonusNumber)) throw new Error();
      return bonusNumber;
    } catch (e) {
      return this.readBonusNumber(winLotto);
    }
  },
};

module.exports = LottoController;
