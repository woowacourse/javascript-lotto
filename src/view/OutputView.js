import MESSAGE from '../constants/message';

const OutputView = {
  printLottoCount(count = 0) {
    console.log(`\n${count}${MESSAGE.OUTPUT.LOTTO_PURCHASED}`);
  },

  printRandomLottos(numbersArray = []) {
    numbersArray.forEach((numbers) => {
      console.log(`[${numbers.join(', ')}]`);
    });
  },
  printResultTitle() {
    console.log(MESSAGE.OUTPUT.WINNING_STATISTICS_TITLE);
  },
  printWinningStatistics(result = []) {
    result.forEach((value) => {
      const [matchCount, isBonus, price, winCount] = value;
      console.log(
        `${matchCount}${MESSAGE.OUTPUT.MATCH_COUNT}${
          isBonus ? MESSAGE.OUTPUT.BONUS_MATCH : ''
        }${MESSAGE.OUTPUT.WIN_PRICE(price.toLocaleString())} ${MESSAGE.OUTPUT.HYPEN} ${winCount}${
          MESSAGE.OUTPUT.WIN_COUNT
        }`
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
