import normalizeErrorMessage from './utils/normalizeErrorMessage.js';

const OUTPUT_MESSAGES = Object.freeze({
  LOTTO_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  SINGLE_LOTTO: (lotto) => `[${lotto.join(', ')}]`,
  RANK_RESULT: (name, { count, price }) => `${name} (${price.toLocaleString()}원) - ${count}개`,
  RANK_RESULT_HEADLINE: '\n당첨 통계\n--------------------',
  REVENUE_RATE: (revenueRate) => `총 수익률은 ${revenueRate}%입니다.`,
});

const OutputView = {
  printLottoQuantity(quantity) {
    console.log(OUTPUT_MESSAGES.LOTTO_QUANTITY(quantity));
  },
  printSingleLotto(lotto) {
    console.log(OUTPUT_MESSAGES.SINGLE_LOTTO(lotto));
  },
  renderUserLottos(userLottos) {
    OutputView.printLottoQuantity(userLottos.length);
    userLottos.forEach((lotto) => (
      OutputView.printSingleLotto(lotto.getNumbers())
    ));
  },

  printRankResultHeadLine() {
    console.log(OUTPUT_MESSAGES.RANK_RESULT_HEADLINE);
  },
  printRankResult(key, value) {
    console.log(OUTPUT_MESSAGES.RANK_RESULT(key, value));
  },
  renderStatisticsResult(rankResult) {
    OutputView.printRankResultHeadLine();
    Object.keys(rankResult).forEach((key) => (
      OutputView.printRankResult(key, rankResult[key])
    ));
  },

  renderRevenueRate(revenueRate) {
    console.log(OUTPUT_MESSAGES.REVENUE_RATE(revenueRate));
  },
  printErrorMessage(message) {
    console.log(normalizeErrorMessage(message));
  },
};

export default OutputView;
