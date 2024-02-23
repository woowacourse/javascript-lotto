import console from '../utils/console';
import LOTTO_STATICS from '../constants/lotto-statics';
import { OUTPUT_MESSAGES } from '../constants/messages';

const outputView = {
  printLottoPayment(count) {
    console.print(OUTPUT_MESSAGES.lottoPayment(count));
  },

  printGeneratedLottos(lottos) {
    lottos.forEach((lotto) => {
      console.print(lotto);
    });
  },

  printWinningStatics(statics) {
    console.print(OUTPUT_MESSAGES.winningStatics);
    console.print(OUTPUT_MESSAGES.winningStaticsOperation);
    this.printStatics(statics);
  },

  // <질문> 방법 1
  printStatics(statics) {
    const keys = Object.keys(LOTTO_STATICS);
    keys.forEach((key) => {
      console.print(`${LOTTO_STATICS[key].message} - ${statics[key]}개`);
    });
  },

  // 방법 2
  // printStatics(statics) {
  //   const keys = Object.keys(LOTTO_STATICS);
  //   keys.forEach((key) => {
  //     console.print(
  //       `${LOTTO_STATICS[key].number}개 일치${key === 'fiveBonus' ? ', 보너스 볼 일치' : ''} (${LOTTO_STATICS[key].price.toLocaleString()}원) - ${statics[key]}개`,
  //     );
  //   });
  // },

  printTotalProfit(profit) {
    console.print(OUTPUT_MESSAGES.totalProfit(profit));
  },

  printNewLine() {
    console.print('');
  },
};

export default outputView;
