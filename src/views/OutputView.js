import { SEPARATOR } from '../constants/CONFIGURATIONS.js';
import { RESULT_MESSAGE } from '../constants/MESSAGES.js';

const OutputView = {
  print(message) {
    console.log(message);
  },

  printPurchaseLottos(purchaseLottos) {
    this.print(`${purchaseLottos.length}개를 구입했습니다.`);
    purchaseLottos.forEach((purchaseLotto) => {
      this.print(`[${purchaseLotto.numbers.join(`${SEPARATOR} `)}]`);
    });
    this.print('');
  },

  printResult(counts, profitRate) {
    this.print(RESULT_MESSAGE.WINNING);
    this.print(RESULT_MESSAGE.DIVIDER);
    this.print(RESULT_MESSAGE.MATCH_3(counts[0]));
    this.print(RESULT_MESSAGE.MATCH_4(counts[1]));
    this.print(RESULT_MESSAGE.MATCH_5(counts[2]));
    this.print(RESULT_MESSAGE.MATCH_5_BONUS(counts[3]));
    this.print(RESULT_MESSAGE.MATCH_6(counts[4]));
    this.print(RESULT_MESSAGE.PROFITRATE(profitRate));
  },
};

export default OutputView;
