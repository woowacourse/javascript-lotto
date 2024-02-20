import PROGRESS_MESSAGES from '../constants/messages/progressMessages';
import Console from '../util/Console';

class OutputView {
  static async printPurchasedLottoAmount(amount) {
    Console.print(`${amount}${PROGRESS_MESSAGES.PRINT_LOTTO_AMOUNT_MESSAGE}`);
  }

  static async printLottoNumbers(lottoNumbers) {
    Console.print(`[${lottoNumbers}]`);
  }
}

export default OutputView;
