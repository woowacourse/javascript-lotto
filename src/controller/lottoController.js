const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");
const InputView = require("../view/inputView");
const OutputView = require("../view/outputView");

const LottoController = {
  lottoGame: undefined,

  async playLotto() {
    this.lottoGame = new LottoGame();

    const lottos = await this.purchaseLotto();
    await this.LotteryTicket(lottos);

    this.restart();
  },

  async purchaseLotto() {
    const money = await this.readMoney();

    const lottos = this.lottoGame.makeLottos(money);
    const lottoCount = lottos.length;

    OutputView.printLottoCount(lottoCount);
    OutputView.printPurchaseLottos(lottos);

    return lottos;
  },

  async LotteryTicket(lottos) {
    const winNumbers = await this.readWinNumbers();
    const bonusNumber = await this.readBonusNumber(winNumbers);

    const lottoCount = lottos.length;
    const winLotto = this.lottoGame.makeWinLotto(winNumbers, bonusNumber);
    const rankResult = this.lottoGame.calculateRankResult(lottos, winLotto);
    const revenue = this.lottoGame.calculateRevenueRate(rankResult, lottoCount);

    OutputView.printRankResult(rankResult);
    OutputView.printRevenue(revenue, lottoCount);
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
