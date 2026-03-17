import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGE } from "../../constants/message.js";
import { formatNumber } from "../../utils/FormatNumber.js";

const OutputView = {
  printPurchasedLottoTickets(lottoCount, lottoNumberArrays) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_COUNT(lottoCount));

    lottoNumberArrays.forEach((numbers) => {
      Console.print(OUTPUT_MESSAGE.LOTTO_NUMBERS(numbers));
    });
  },

  printResult(resultData, profitRate) {
    Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS_HEADER);

    this.printWinningInfo(resultData);

    const formattedProfitRate = profitRate;

    Console.print(OUTPUT_MESSAGE.PROFIT_RATE(formattedProfitRate));
  },

  printWinningInfo(resultData) {
    resultData.forEach((rank) => {
      const { matchCount, money, requireBonus, count } = rank;

      let matchMessage = OUTPUT_MESSAGE.WINNING_MATCH_COUNT_INFO(matchCount);
      if (requireBonus) matchMessage += OUTPUT_MESSAGE.IS_BONUS_NUMBER_MATCH;

      const formattedMoney = formatNumber(money);
      const prizeMessage = OUTPUT_MESSAGE.WINNING_PRIZE_MONEY(formattedMoney);

      Console.print(`${matchMessage} ${prizeMessage} - ${count}개`);
    });
  },

  printMessage(message) {
    Console.print(message);
  },
};

export default OutputView;
