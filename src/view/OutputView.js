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
    console.log(`${NEW_LINE}${OUTPUT_MESSAGE.WINNING_STATISTICS_TITLE}`);
  },

  printWinningStatisticsReverse(result = []) {
    result.forEach((_, index) => {
      const rankIndex = Math.abs(5 - index);
      console.log(
        `${OUTPUT_MESSAGE.MATCH_COUNT(WINNER[rankIndex].MATCH_COUNT)}${
          WINNER[rankIndex].IS_BONUS ? OUTPUT_MESSAGE.BONUS_MATCH : ''
        }${OUTPUT_MESSAGE.WIN_PRICE(WINNER[rankIndex].PRICE)}${OUTPUT_MESSAGE.WIN_COUNT(result[rankIndex - 1])}`
      );
    });
  },

  printRateOfRevenue(rateOfRevenue = '') {
    console.log(OUTPUT_MESSAGE.RATE_OF_REVENUE(rateOfRevenue));
  },

  printError(message) {
    console.log(message);
  },
};

export default OutputView;
