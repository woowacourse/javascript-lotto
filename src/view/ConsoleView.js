import Console from "../utils/Console.js";
import { MATCH, MESSAGES, SETTINGS } from "../constants/Config.js";

const InputView = {
  async inputMoney(query) {
    const buyMoney = await Console.read(query);
    return buyMoney;
  },

  async inputWinningNumbers(query) {
    const winningNumbers = await Console.read(query);
    return winningNumbers;
  },

  async inputBonusNumber(query) {
    const bonusNumber = await Console.read(query);
    return bonusNumber;
  },

  async inputRetry(query) {
    const retryInput = await Console.read(query);
    return retryInput;
  },
};

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

export { InputView, OutputView };
