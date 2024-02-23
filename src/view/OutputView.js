import { OUTPUT_MESSAGE } from '../constants/message';
import WINNER from '../constants/winner';

const OutputView = {
  printLottoCount(count = 0) {
    console.log(OUTPUT_MESSAGE.LOTTO_PURCHASED(count));
  },

  printRandomLottos(numbersArray = []) {
    numbersArray.forEach((numbers) => {
      console.log(`[${numbers.join(', ')}]`);
    });
  },
  printResultTitle() {
    console.log(OUTPUT_MESSAGE.WINNING_STATISTICS_TITLE);
  },
  printWinningStatistics(result = []) {
    result.forEach((winCount, index) => {
      // const [, isBonus, , winCount] = value;
      console.log(
        `${OUTPUT.MATCH_COUNT(prizeIndex)}${
          WINNER[index + 1].IS_BONUS && OUTPUT_MESSAGE.BONUS_MATCH
        }${OUTPUT_MESSAGE.WIN_PRICE(prizeIndex)}${OUTPUT_MESSAGE(winCount)}`
      );
    });
  },

  printRateOfRevenue(rateOfRevenue = '') {
    console.log(MESSAGE.OUTPUT.RATE_OF_REVENUE(rateOfRevenue));
  },

  printError(message) {
    console.log(message);
  },
};

export default OutputView;
