const LottoGame = require("../domain/LottoGame");
const InputView = require("../view/inputView");
const OutputView = require("../view/outputView");

const LottoController = {
  async playLotto() {
    const lottoCount = parseInt((await this.readMoney()) / 1000);
    OutputView.printLottoCount(lottoCount);
    LottoGame.makeLottos(lottoCount);
    OutputView.printPurchaseLottos(LottoGame.lottos);
    const winningNumbers = await this.readWinningNumbers();
    const bonusNumber = await this.readBonusNumber(winningNumbers);

    const [revenue, rankResult] = LottoGame.makeWinLotto(
      winningNumbers,
      bonusNumber
    );
    OutputView.printRankResult(rankResult);
    OutputView.printRevenue(revenue);
    this.restart();
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
      return this.readBonusNumber();
    }
  },

  validateMoney(money) {
    return money > 0 && money % 1000 === 0;
  },

  validateWinningNumber(winningNumbers) {
    if (winningNumbers.some((num) => 1 > num || num > 45 || isNaN(num)))
      return false;
    if (winningNumbers.length != 6) return false;
    return true;
  },

  validateBonusNumber(winLotto, bonusNumber) {
    if (1 > bonusNumber || bonusNumber > 45 || isNaN(bonusNumber)) return false;
    if (winLotto.includes(bonusNumber)) return false;
    return true;
  },
};

module.exports = LottoController;
