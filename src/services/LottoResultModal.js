import LottoCalculator from '../domains/LottoCalculator.js';
import OutputWebView from '../views/OutputWebView.js';
import { $ } from '../utils/dom.js';

class LottoResultModal {
  static calculateAndShowResults(lottoNumbers, generatedLottos, ticketCount) {
    const lottoCalculator = new LottoCalculator(lottoNumbers, generatedLottos);
    this.showLottoStatistics(lottoCalculator);
    this.showTotalProfit(lottoCalculator, ticketCount);
  }

  static showLottoStatistics(lottoCalculator) {
    const lottoStatistics = lottoCalculator.lottoStatistics;
    $('#lotto-statistics-tbody').innerHTML =
      OutputWebView.displayStatistics(lottoStatistics);
  }

  static showTotalProfit(lottoCalculator, ticketCount) {
    const totalProfit = lottoCalculator.calculateTotalProfit(ticketCount);
    $('#profit-text').textContent =
      OutputWebView.displayTotalProfit(totalProfit);
  }
}

export default LottoResultModal;
