import Console from './Console';
import OUTPUT from '../../constants/output';

const OutputView = {
  printPurchaseAmount(amount) {
    Console.print(OUTPUT.PURCHASE_AMOUNT(amount));
  },

  printLottoNumbers(numbers) {
    Console.print(OUTPUT.LOTTO_NUMBERS(numbers));
  },

  printStatsticsTitle() {
    Console.print(OUTPUT.STATSTICS_TITLE);
  },

  printStatstics(statstics) {
    Console.print(OUTPUT.STATSTICS(statstics));
  },

  printError(error) {
    Console.print(`${OUTPUT.ERROR_PREFIX} ${error.messages}`);
  },
};

export default OutputView;
