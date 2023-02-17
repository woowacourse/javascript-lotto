const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");
const InputView = require("../view/inputView");
const OutputView = require("../view/outputView");

const LottoController = {
  async playLotto() {
    const lottoGame = new LottoGame();
    const lottoGameHasTickets = await this.purchaseLotto(lottoGame);
    await this.LotteryTicket(lottoGameHasTickets);

    this.restart();
  },

  async purchaseLotto(lottoGame) {
    const money = await this.readMoney();

    lottoGame.makeLottos(money);

    OutputView.printLottoCount(lottoGame.lottoCount);
    OutputView.printPurchaseLottos(lottoGame.lottos);

    return lottoGame;
  },

  async LotteryTicket(lottoGame) {
    const winNumbers = await this.readWinNumbers();
    const bonusNumber = await this.readBonusNumber(winNumbers);

    lottoGame.makeWinLotto(winNumbers, bonusNumber);
    const rankResult = lottoGame.calculateRankResult();
    const revenue = lottoGame.calculateRevenueRate(rankResult);

    OutputView.printRankResult(rankResult);
    OutputView.printRevenue(revenue);

    return lottoGame;
  },

  async restart() {
    try {
      const command = await InputView.readCommandRestart();
      Validation.validateRestartCommand(command);
      return command === "y" ? this.playLotto() : InputView.close();
    } catch (e) {
      OutputView.printErrorMessage(e.message);
      await this.restart();
    }
  },

  async readMoney() {
    try {
      const money = await InputView.readMoney();
      Validation.validateMoney(money);
      return money;
    } catch (e) {
      OutputView.printErrorMessage(e.message);
      await this.readMoney();
    }
  },

  async readWinNumbers() {
    try {
      const input = await InputView.readWinNumbers();
      const winNumbers = input.split(",").map((num) => parseInt(num));
      Validation.validateWinNumber(winNumbers);
      return winNumbers;
    } catch (e) {
      OutputView.printErrorMessage(e.message);
      await this.readWinNumbers();
    }
  },

  async readBonusNumber(winLotto) {
    try {
      const input = await InputView.readBonusNumber();
      const bonusNumber = parseInt(input);
      Validation.validateBonusNumber(winLotto, bonusNumber);
      return bonusNumber;
    } catch (e) {
      OutputView.printErrorMessage(e.message);
      await this.readBonusNumber(winLotto);
    }
  },
};

module.exports = LottoController;
