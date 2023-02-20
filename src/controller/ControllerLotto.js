const inputView = require('../view/inputView.js');
const LottoMachine = require('../domain/LottoMachine.js');
const outputView = require('../view/outputView.js');
const { winningIncludeBonusNumber } = require('../utils/validation.js');
class ControllerLotto {
  #money;
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async playLotto() {
    this.#money = await this.inputLottoMoney();
    this.showLottoCount(this.#lottoMachine.countLotto(this.#money));
    this.#lottoMachine.makeLotto(this.#money);
    this.showPurchasedLotto(this.#lottoMachine.lottoNumber);
    this.playStatisticalChart(this.#lottoMachine.lottoNumber);
  }

  async playStatisticalChart() {
    const winningNumber = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber();
    if (winningIncludeBonusNumber(winningNumber, bonusNumber)) return this.playStatisticalChart();
    const result = this.#lottoMachine.getWinningStatus(winningNumber.split(','), bonusNumber);
    this.showWinningHistory(result);
    const profit = this.#lottoMachine.getProfitRate(this.#money, result);
    this.showEarningsRate(profit);
    this.restart();
  }

  inputLottoMoney() {
    return inputView.readMoney();
  }

  showLottoCount(count) {
    outputView.printLottoCount(count);
  }

  showPurchasedLotto(lottos) {
    outputView.printLottoNumber(lottos);
  }
  inputWinningNumbers() {
    return inputView.readWinningNumber();
  }
  inputBonusNumber() {
    return inputView.readBonusNumber();
  }

  showWinningHistory(rank) {
    outputView.printWinningHistory(rank);
  }

  showEarningsRate(rate) {
    outputView.printEarningsRate(rate);
  }

  async restart() {
    if (await inputView.readRestartOrFinish()) this.playLotto();
  }
}

module.exports = ControllerLotto;
