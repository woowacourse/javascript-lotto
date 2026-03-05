import { Console } from '@woowacourse/mission-utils';
import { PRIZE, RANK_MAP } from '../Utils/Constants.js';

const OutputConsole = {

  printLottoList(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => Console.print(lotto.toString()));
    Console.print('');
  },

};

export default OutputConsole;