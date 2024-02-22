import { MESSAGE } from '../constants/message';

const OutputView = {
  print(message = '') {
    console.log(message);
  },

  printLotto(lotto) {
    this.print(`[${lotto.join(', ')}]`);
  },

  printLottery(lottery) {
    lottery.forEach(lotto => {
      this.printLotto(lotto.numberList);
    });
  },

  printLottoCount(lottoCount) {
    this.print(`${lottoCount}${MESSAGE.LOTTO_COUNT}`);
  },
};

export default OutputView;
