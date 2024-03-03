import { MESSAGES } from "../constants/message.js";
import Console from "../utils/Console.js";

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printGameIntro() {
    Console.print(MESSAGES.gameIntro);
  },

  printLottoCount(lottoCount) {
    Console.print(MESSAGES.purchasedLottoCount(lottoCount));
  },

  printReturnRate(returnRate) {
    Console.print(MESSAGES.returnRate(returnRate));
  },

  printTotalLottos(lottos) {
    lottos.forEach((lotto) => {
      const sortedLottoNumers = lotto.sort((a, b) => a - b);
      Console.print(sortedLottoNumers);
    });
  },

  printWinningResult({ resultBoard, rewards, rankCondition }) {
    Console.print(MESSAGES.resultIntro);

    const ranks = Object.keys(rankCondition);

    ranks.forEach((rank) => {
      const matchedCount = rankCondition[rank].matchedCount;
      const useBonusNumber = rankCondition[rank].useBonusNumber;
      const reward = rewards[rank];
      const resultCount = resultBoard[rank];

      Console.print(
        MESSAGES.result({ matchedCount, useBonusNumber, reward, resultCount })
      );
    });
  },
};

export default OutputView;
