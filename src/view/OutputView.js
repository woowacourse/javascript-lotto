import { OUTPUT_MESSAGE } from '../constants/message';

const OutputView = {
  printLottoCount(count = 0) {
    console.log(`\n${count}${OUTPUT_MESSAGE.LOTTO_PURCHASED}`);
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
    result.forEach((value) => {
      const [matchCount, isBonus, price, winCount] = value;
      const bonusMatch = isBonus ? ', 보너스 볼 일치' : '';
      console.log(`${matchCount}개 일치${bonusMatch} (${price.toLocaleString()}) - ${winCount}개`);
    });
  },

  printRateOfRevenue(rateOfRevenue = '') {
    console.log(`총 수익률은 ${rateOfRevenue}%입니다`);
  },

  printError(message) {
    console.log(message);
  },
};

export default OutputView;
