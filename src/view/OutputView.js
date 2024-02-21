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
    console.log('당첨 통계');
    console.log('--------------------');
  },
  printWinningStatistics(result = []) {
    result.forEach((value) => {
      const [matchCount, isBonus, price, winCount] = value;
      console.log(`${matchCount}개 일치${isBonus ? ', 보너스 볼 일치' : ''} (${price.toLocaleString()}원) - ${winCount}개`);
    });
  },

  printError(message) {
    console.log(message);
  },
};

export default OutputView;
