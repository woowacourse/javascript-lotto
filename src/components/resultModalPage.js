const LottoMachine = require('../domain/LottoMachine.js');
const RankedLotto = require('../domain/RankedLotto.js');
const { winningNumbersTag, bonusNumberTag, lottoInput } = require('../utils/DOM.js');

class resultModalPage {
  constructor() {
    this.rankedLotto = new RankedLotto();
    this.lottoMachine = new LottoMachine();
  }
  openModalButton(lottoList) {
    this.getLottoWin(lottoList);
  }

  getLottoWin(lottoList) {
    this.lottoMachine.lottoNumber = lottoList;
    const winningNumber = [];
    const bonusNumber = bonusNumberTag.value;
    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });
    const lottoResult = this.lottoMachine.compareNumber(winningNumber, bonusNumber);
    const lottoResultChart = this.rankedLotto.getResult(lottoResult);
  }
}

module.exports = resultModalPage;
