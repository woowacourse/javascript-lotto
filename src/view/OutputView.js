import { ConsoleMessage } from "../constants/Constants.js";
import Console from "../utils/Console.js";

const OutputView = {
  printUserLottos(lotto) {
    console.log(`[${lotto.join(", ")}]`);
  },

  printRanks(ranks) {
    const RANK_MESSAGES = ConsoleMessage.rankResult(ranks);
    RANK_MESSAGES.forEach((message) => console.log(message));
  },

  printProfitRate(profitRate) {
    console.log(ConsoleMessage.profitRateResult(profitRate));
  },

  print(message) {
    console.log(message);
  },

  close() {
    Console.close();
  },
};

export default OutputView;
