const LottoMachine = require('../domain/LottoMachine.js');
const RankedLotto = require('../domain/RankedLotto.js');
const { winningNumbersTag, bonusNumberTag } = require('../utils/DOM.js');
const display = require('../view/display.js');

class resultModalPage {
  constructor() {
    this.rankedLotto = new RankedLotto();
    this.lottoMachine = new LottoMachine();
    this.lottoResultChart = [];
  }
  openModalButton(lottoList, money) {
    this.getLottoWin(lottoList);
    this.getProfitRate(money, this.lottoResultChart);
  }

  getLottoWin(lottoList) {
    this.lottoMachine.lottoNumber = lottoList;
    const winningNumber = [];
    const bonusNumber = bonusNumberTag.value;
    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });
    const lottoResult = this.lottoMachine.compareNumber(winningNumber, bonusNumber);
    this.lottoResultChart = this.rankedLotto.getResult(lottoResult);
    display.showModal(this.lottoResultChart);
  }

  getProfitRate(money, lottoResultChart) {
    const profitRate = this.rankedLotto.earningsRate(money, lottoResultChart);
    display.showProfitRate(profitRate);
  }
}

module.exports = resultModalPage;
