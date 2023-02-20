const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");

class LottoController {
  #lottoGame;
  #view;

  constructor(inputView, outputView) {
    this.#view = { ...inputView, ...outputView };
  }

  async playLotto() {
    this.#lottoGame = new LottoGame();

    const money = await this.readMoney();
    const lottos = await this.purchaseLotto(money);

    const winNumbers = await this.readWinNumbers();
    const bonusNumber = await this.readBonusNumber(winNumbers);
    const winLotto = this.#lottoGame.makeWinLotto(winNumbers, bonusNumber);
    await this.drawLotto(lottos, winLotto);

    this.restart();
  }

  async purchaseLotto(money) {
    const lottos = this.#lottoGame.makeLottos(money);
    const lottoCount = lottos.length;

    this.#view.printLottoCount(lottoCount);
    this.#view.printPurchaseLottos(lottos);

    return lottos;
  }

  async drawLotto(lottos, winLotto) {
    const lottoCnt = lottos.length;
    const rankResult = this.#lottoGame.calculateRankResult(lottos, winLotto);
    const revenue = this.#lottoGame.calculateRevenueRate(rankResult, lottoCnt);

    this.#view.printRankResult(rankResult);
    this.#view.printRevenue(revenue, lottoCnt);
  }

  async restart() {
    try {
      const command = await this.#view.readCommandRestart();
      Validation.validateRestartCommand(command);
      return command === "y" ? this.playLotto() : this.#view.close();
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      this.restart();
    }
  }

  async readMoney() {
    try {
      const money = await this.#view.readMoney();
      Validation.validateMoney(money);
      return parseInt(money);
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      return this.readMoney();
    }
  }

  async readWinNumbers() {
    try {
      const input = await this.#view.readWinNumbers();
      Validation.validateWinNumber(input.split(","));
      const winNumbers = input.split(",").map((num) => parseInt(num));
      return winNumbers;
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      return this.readWinNumbers();
    }
  }

  async readBonusNumber(numbers) {
    try {
      const input = await this.#view.readBonusNumber();
      Validation.validateBonusNumber(numbers, input);
      const bonusNumber = parseInt(input);
      return bonusNumber;
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      await this.readBonusNumber(numbers);
    }
  }
}

module.exports = LottoController;
