import { MESSAGE } from '../constants/message';
import CONFIG from '../constants/config';

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
    this.print(`3개 일치 (${CONFIG.PRIZE[5].toLocaleString('ko-KR')}원) - ${rankList[5]}개`);
    this.print(`4개 일치 (${CONFIG.PRIZE[4].toLocaleString('ko-KR')}원) - ${rankList[4]}개`);
    this.print(`5개 일치 (${CONFIG.PRIZE[3].toLocaleString('ko-KR')}원) - ${rankList[3]}개`);
    this.print(`5개 일치, 보너스 볼 일치 (${CONFIG.PRIZE[2].toLocaleString('ko-KR')}원) - ${rankList[2]}개`);
    this.print(`6개 일치 (${CONFIG.PRIZE[1].toLocaleString('ko-KR')}원) - ${rankList[1]}개`);
  },

  printProfit(profit) {
    this.print(`총 수익률은 ${profit}%입니다.`);
  },
};

export default OutputView;
