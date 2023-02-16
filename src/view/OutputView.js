import readLine from '../utils/readLine.js';

const OutputView = {
  printPurchasedLottoCount(count) {
    readLine.write(`${count}개를 구매했습니다.`);
  },

  printPurChasedLottoList(lottos) {
    lottos.forEach((lotto) => {
      readLine.write(`[${lotto.join(', ')}]`);
    });
  },
};

export default OutputView;
