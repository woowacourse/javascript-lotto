const OutputView = {
  printLottoCount(count = 0) {
    console.log(`\n${count}개를 구매했습니다.`);
  },

  printRandomLottos(numbersArray = []) {
    numbersArray.forEach((numbers) => {
      console.log(`[${numbers.join(', ')}]`);
    });
  },
  printResultTitle() {
    console.log('\n당첨 통계');
    console.log('--------------------');
  },
  printWinningStatistics(result = []) {
    result.forEach((value) => {
      const [matchCount, isBonus, price, winCount] = value;
      console.log(
        `${matchCount}개 일치${isBonus ? ', 보너스 볼 일치' : ''} (${price.toLocaleString()}원) - ${winCount}개`
      );
    });
  },

  printRateOfRevenue(rateOfRevenue = '') {
    console.log(`총 수익률은 ${rateOfRevenue}%입니다.`);
  },

  printError(message) {
    console.log(message);
  },
};

export default OutputView;
