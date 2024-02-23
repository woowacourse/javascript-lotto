import { MESSAGE } from '../constants/message';
import CONFIG from '../constants/config';
import PRIZE from '../constants/prize';

const OutputView = {
  print(message = '') {
    console.log(message);
  },

  printLotto(lotto) {
    this.print(`[${lotto.join(CONFIG.JOIN_SEPARATOR)}]`);
  },

  printLottery(lottery) {
    lottery.forEach(lotto => {
      this.printLotto(lotto.numberList);
    });
  },

  printLottoCount(lottoCount) {
    this.print(`${lottoCount}${MESSAGE.LOTTO_COUNT}`);
  },

  printLottoResult(rankList) {
    this.print(MESSAGE.LOTTO_RESULT);
    this.print(`3개 일치 (${PRIZE.AMOUNT[PRIZE.FIFTH].toLocaleString('ko-KR')}원) - ${rankList[PRIZE.FIFTH]}개`);
    this.print(`4개 일치 (${PRIZE.AMOUNT[PRIZE.FORTH].toLocaleString('ko-KR')}원) - ${rankList[PRIZE.FORTH]}개`);
    this.print(`5개 일치 (${PRIZE.AMOUNT[PRIZE.THIRD].toLocaleString('ko-KR')}원) - ${rankList[PRIZE.THIRD]}개`);
    this.print(
      `5개 일치, 보너스 볼 일치 (${PRIZE.AMOUNT[PRIZE.SECOND].toLocaleString('ko-KR')}원) - ${rankList[PRIZE.SECOND]}개`,
    );
    this.print(`6개 일치 (${PRIZE.AMOUNT[PRIZE.FIRST].toLocaleString('ko-KR')}원) - ${rankList[PRIZE.FIRST]}개`);
  },

  printProfit(profit) {
    this.print(`총 수익률은 ${profit}%입니다.`);
  },
};

export default OutputView;
