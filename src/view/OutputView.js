import PROGRESS_MESSAGES from '../constants/messages/progressMessages';
import Console from '../util/Console';
import { lottoResultMessageGenerator } from '../domain/lottoResultMessageGenerator';
import LOTTO_RULE from '../constants/rules/lottoRule';

class OutputView {
  static async printPurchasedLottoAmount(amount) {
    Console.print(`${amount}${PROGRESS_MESSAGES.PRINT_LOTTO_AMOUNT_MESSAGE}`);
  }

  static async printLottoNumbers(lottoNumbers) {
    const lottoNumbersToString = String(lottoNumbers).split(LOTTO_RULE.NUMBER_DELIMITER).join(', ');

    Console.print(`[${lottoNumbersToString}]`);
  }

  static async printResultNotice() {
    Console.print(PROGRESS_MESSAGES.PRINT_RESULT_NOTICE_MESSAGE);
  }

  static async printLottoResult(lottoRank, idx) {
    const lottoResultMessage = lottoResultMessageGenerator(lottoRank, idx);
    Console.print(`${lottoResultMessage}`);
  }

  static async printTotalProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }

  static async printExitLotto() {
    Console.print(PROGRESS_MESSAGES.PRINT_EXIT_MESSAGE);
  }
}

export default OutputView;
