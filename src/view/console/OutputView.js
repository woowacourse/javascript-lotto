import Console from "../../utils/Console";
import { AMOUNT_OF_PURCHASE, MESSAGE, RESULT, PRIZE } from ("../constants");

const OutputView = {
  printError(error) {
    Console.print(error.message);
  },

  printLotteries(lotteries) {
    Console.print(AMOUNT_OF_PURCHASE(lotteries.length));
    lotteries.forEach((lotto) => Console.print(`[${lotto}]`));
  },

  printResult(lottoResult) {
    Console.print(RESULT(PRIZE, lottoResult));
  },

  printRestart() {
    Console.print(MESSAGE.RESTART);
  },

  printQuit() {
    Console.print(MESSAGE.QUIT);
    Console.close();
  },
};

export default OutputView;
