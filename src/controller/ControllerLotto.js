const inputView = require('../view/inputView');
const LottoMachine = require('../domain/LottoMachine');
const outputView = require('../view/outputView');
const RankedLotto = require('../domain/RankedLotto');

class ControllerLotto {
  async playLotto() {
    this.money = await this.inputLottoMoney();
    const lottoMachine = new LottoMachine();
    this.showLottoCount(lottoMachine.countLotto(this.money));
    lottoMachine.makeLotto(this.money);
    this.showPurchasedLotto(lottoMachine.lottoNumber);
    this.playStatisticalChart(lottoMachine.lottoNumber);
  }

  async playStatisticalChart(lotto) {
    const rankedLotto = new RankedLotto();
    rankedLotto.setNumber(lotto);
    const ranks = rankedLotto.ranking((await this.inputWinningNumbers()).split(','), await this.inputBonusNumber());
    const result = rankedLotto.getResult(ranks);
    this.showWinningHistory(result);
    rankedLotto.earningsRate(this.money, result);
    this.showEarningsRate(rankedLotto.getProfit);
    this.restart();
  }

  inputLottoMoney() {
    return inputView.readMoney();
  }

  showLottoCount(count) {
    outputView.printCountLotto(count);
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
