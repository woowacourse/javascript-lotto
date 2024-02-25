import { PROGRESS_MESSAGES, NEW_LINE, PERFORATION_LINE } from '../constants/messages/progressMessages';
import Console from '../util/Console';
import { mentGenerator } from '../util/mentGenerator';

class OutputView {
  static async printPurchasedLottoAmount(amount) {
    Console.print(`${amount}${PROGRESS_MESSAGES.PRINT_LOTTO_AMOUNT_MESSAGE}`);
  }

  static async printLottoNumbers(lottoNumbers) {
    const lottoNumbersToString = String(lottoNumbers).split(',').join(', ');

    Console.print(`[${lottoNumbersToString}]`);
  }

  static async printResultNotice() {
    Console.print(`${NEW_LINE}${PROGRESS_MESSAGES.PRINT_RESULT_NOTICE_MESSAGE}`);
    Console.print(`${PERFORATION_LINE}`);
  }

  static async printLottoResult(lottoRank, idx) {
    const ment = mentGenerator(lottoRank, idx);
    Console.print(`${ment}`);
  }

  static async printTotalProfitRate(profitRate) {
    Console.print(`${PROGRESS_MESSAGES.PRINT_TOTAL_PROFIT_RATE_MESSAGE(profitRate)}${NEW_LINE}`);
  }

  static async printExitLotto() {
    Console.print(PROGRESS_MESSAGES.PRINT_EXIT_MESSAGE);
  }
}

export default OutputView;
