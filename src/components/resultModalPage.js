import LottoMachine from '../domain/LottoMachine.js';
import RankedLotto from '../domain/RankedLotto.js';
import { $, $$ } from '../utils/DOM.js';
import { display } from '../view/display.js';

export default class resultModalPage {
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
    const bonusNumber = $('.bonus-number').value;
    $$('.winning-number').forEach((number, index) => {
      winningNumber[index] = number.value;
    });
    const lottoResult = this.lottoMachine.compareNumber(winningNumber, bonusNumber);
    this.lottoResultChart = this.rankedLotto.getResult(lottoResult);
    display.showModal(this.lottoResultChart);
  }

  getProfitRate(money, lottoResultChart) {
    this.rankedLotto.earningsRate(money, lottoResultChart);
    display.showProfitRate(this.rankedLotto.getProfit);
  }
}
