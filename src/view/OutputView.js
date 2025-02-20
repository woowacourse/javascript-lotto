const OutputView = {
  printLottoQuantity(quantity) {
    console.log(`${quantity}개를 구매했습니다.`);
  },
  printSingLotto(lotto) {
    console.log(`[${lotto.join(', ')}]`);
  },
  printRankResult(key, value) {
    console.log(`${key} (${(value.price).toLocaleString()}원) - ${value.count}개`);
  },
  printRankResultHeadLine() {
    console.log('\n당첨 통계');
    console.log('--------------------');
  },
  printRevenueRate(revenueRate) {
    console.log(`총 수익률은 ${revenueRate}%입니다.`);
  },
};

export default OutputView;
