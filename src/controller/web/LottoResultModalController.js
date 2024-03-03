import { $ } from '../../util/domSelector';
import LottoResultModalView from '../../view/web/LottoResultModalView';
import LottoProcess from '../../domain/LottoProcess';
import LottoCalculator from '../../domain/LottoCalculator';

class LottoResultModalController {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    $('.modal-background').addEventListener('click', () => {
      LottoResultModalView.resetModal();
    });

    $('#close-modal-button').addEventListener('click', () => {
      LottoResultModalView.resetModal();
    });
  }

  makeWinResult(lottos, winLotto) {
    const lottoProcess = new LottoProcess();
    const winResult = lottoProcess.getResult(lottos, winLotto);
    return winResult;
  }

  makeRateOfRevenue(winResult, lottosCount) {
    const lottoCalculator = new LottoCalculator();
    const rateOfRevenue = lottoCalculator.getRateOfRevenue(winResult, lottosCount);
    return rateOfRevenue;
  }

  showWinResults(lottos, winLotto) {
    const winResult = this.makeWinResult(lottos, winLotto);
    this.showWinStatisticTable(winResult);
    const rateOfRevenue = this.makeRateOfRevenue(winResult, lottos.length);
    this.showRateOfReturn(rateOfRevenue);
    LottoResultModalView.renderSection();
  }

  showWinStatisticTable(winResult) {
    LottoResultModalView.renderSection();
    LottoResultModalView.renderWinResultTable(winResult);
  }

  showRateOfReturn(rateOfRevenue) {
    LottoResultModalView.renderReturnOfRatio(rateOfRevenue);
  }
}

export default LottoResultModalController;
