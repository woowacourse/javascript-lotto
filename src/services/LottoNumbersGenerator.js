import LottoGenerator from '../domains/LottoGenerator.js';
import OutputWebView from '../views/OutputWebView.js';
import { $ } from '../utils/dom.js';
import LOTTO_RULES from '../constants/lotto-rules.js';

class LottoNumbersGenerator {
  static getTicketCount(lottoPurchasePrice) {
    return lottoPurchasePrice / LOTTO_RULES.lottoBaseTicketPrice;
  }

  static generateLottos(ticketCount) {
    const lottoGenerator = new LottoGenerator(ticketCount);
    return lottoGenerator.generatedLottos;
  }

  static displayGeneratedLottoInfo(ticketCount, generatedLottos) {
    this.displayTicketCount(ticketCount);
    this.displayGeneratedLottos(generatedLottos);
  }

  static displayTicketCount(ticketCount) {
    $('#total-ticket-count').textContent =
      OutputWebView.displayTicketCount(ticketCount);
  }

  static displayGeneratedLottos(generatedLottos) {
    const $generatedLottoContents = $('#generated-lotto-contents');
    if ($generatedLottoContents) {
      $generatedLottoContents.remove();
    }

    $('#generated-lotto-container').appendChild(
      OutputWebView.displayGeneratedLottos(generatedLottos),
    );
  }
}

export default LottoNumbersGenerator;
