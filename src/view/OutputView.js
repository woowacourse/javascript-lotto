const OutputView = {
  printBuyCount(count) {
    console.log(`${count}개를 구매했습니다.\n`);
  },

  printLotto(lotto) {
    console.log(`[${lotto.join(', ')}]`);
  },

  printResult(results) {
    console.log('당첨 통계');
    console.log('--------------------');
    OutputView.printMatchResult(results);
  },

  printMatchResult({ three, four, five, five_bonus, six }) {
    console.log(`3개 일치, (5,000원) - ${three}개`);
    console.log(`4개 일치, (5,0000원) - ${four}개`);
    console.log(`5개 일치, (1,500,000원) - ${five}개`);
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${five_bonus}개`);
    console.log(`6개 일치, (2,000,000,000원) - ${six}개`);
  },

  printProfit(profit) {
    console.log(`총 수익률은 ${profit}% 입니다.`);
  },
};

export default OutputView;
