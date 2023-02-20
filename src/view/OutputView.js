import { MATCH, MESSAGES, SETTINGS } from "../constants/Config.js";
import Console from "../utils/Console.js";

const OutputView = {
  printLottoAmount(lottoAmount) {
    Console.print(`${lottoAmount}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      lotto.sortLottoNumbers();
      Console.print(lotto.getLottoNumbers());
    });
  },

  printResultMessage() {
    Console.print(MESSAGES.PRINT_RESULT);
    Console.print(
      MESSAGES.PRINT_DIVISION.repeat(SETTINGS.REPEAT_PRINT_DIVISION)
    );
  },

  printLottoResults(lottos) {
    for (const score in lottos.getLottoRanking()) {
      Console.print(
        `${score} (${MATCH.MONEY_BOARD[score]}${SETTINGS.MONEY_UNIT}) - ${
          lottos.getLottoRanking()[score]
        }개`
      );
    }
  },

  printTotalBenefit(lottos) {
    Console.print(
      `총 수익률은 ${lottos.getBenefitRate(
        lottos.getLottos().length * SETTINGS.DIVIDE_MONEY_VALUE
      )}% 입니다.`
    );
  },
};

export default OutputView;
