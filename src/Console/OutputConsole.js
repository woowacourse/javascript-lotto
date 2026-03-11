import { Console } from '@woowacourse/mission-utils';
import { PRIZE, RANK_MAP } from '../Utils/Constants.js';

const OutputConsole = {
  printLottoList(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => Console.print(lotto.getFormattedNumbers()));
    Console.print("");
  },

  printMatchResult(result) {
    Console.print('\n당첨 통계');
    Console.print('--------------------');

    // 등수별 결과 출력
    for (const key in result) {
      const prize = PRIZE[key].toLocaleString();
      const count = result[key];
      Console.print(`${RANK_MAP[key]} (${prize}원) - ${count}개`);
    }
  },

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputConsole;