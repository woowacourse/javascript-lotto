import readLine from '../utils/readLine.js';

const OutputView = {
  printPurchasedLottoCount(count) {
    console.log(`${count}개를 구매했습니다.`);
  },

  printPurChasedLottoList(lottos) {
    lottos.forEach((lotto) => {
      console.log(`[${lotto.getLottoNumber().join(', ')}]`);
    });
  },

  printWinningRankResult(rankResult) {
    console.log('\n당첨 통계\n--------------------');
    console.log(`3개 일치 (5,000원) - ${rankResult[5]}`);
    console.log(`4개 일치 (50,000원) - ${rankResult[4]}`);
    console.log(`5개 일치 (1,500,000원) - ${rankResult[3]}`);
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankResult[2]}`);
    console.log(`6개 일치 (2,000,000,000원) - ${rankResult[1]}`);
  },

  printProfitRate(rate) {
    const parsedRate = Number(rate.toFixed(1)).toLocaleString();
    console.log(`총 수익률은 ${parsedRate}%입니다.`);
  },

  printErrorMessage(error) {
    console.error(error.message);
  },

  closeConsole() {
    readLine.close();
  },
};

export default OutputView;
