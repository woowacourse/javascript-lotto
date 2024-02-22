import Console from '../utils/Console';
import { OUTPUT_MESSAGES } from '../constants/messages';
import { LOTTO_STATICS } from '../constants/lotto-statics';

const OutputView = {
  printLottoPayment(count) {
    Console.print(OUTPUT_MESSAGES.lottoPayment(count));
  },

  printGeneratedLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printWinningStatics(statics) {
    Console.print(OUTPUT_MESSAGES.winningStatics);
    Console.print(OUTPUT_MESSAGES.winningStaticsOperation);
    this.printStatics(statics);
  },

  // <질문> 방법 1
  printStatics(statics) {
    const keys = Object.keys(LOTTO_STATICS);
    keys.forEach((key) => {
      Console.print(`${LOTTO_STATICS[key].message} - ${statics[key]}개`);
    });
  },

  // 방법 2
  // printStatics(statics) {
  //   const keys = Object.keys(LOTTO_STATICS);
  //   keys.forEach((key) => {
  //     Console.print(
  //       `${LOTTO_STATICS[key].number}개 일치${key === 'fiveBonus' ? ', 보너스 볼 일치' : ''} (${LOTTO_STATICS[key].price.toLocaleString()}원) - ${statics[key]}개`,
  //     );
  //   });
  // },

  printTotalProfit(profit) {
    Console.print(OUTPUT_MESSAGES.totalProfit(profit));
  },

  printNewLine() {
    Console.print('');
  },
};

export default OutputView;
