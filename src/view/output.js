import Trimmer from '../util/Trimmer.js';
import { FORMATTING_TYPE, GAME_VALUE } from '../constants/index.js';

const output = (data, formattingType = '') => {
  if (formattingType === '') {
    return console.log(data);
  }

  if (formattingType === FORMATTING_TYPE.BOUGHT_LOTTOS) {
    console.log(`${data.length}개를 구매했습니다.`);

    return data.forEach((lotto) => {
      console.log(`[${lotto.join(', ')}]`);
    });
  }

  if (formattingType === FORMATTING_TYPE.WINNING_STATUS) {
    console.log(
      Trimmer.trimTemplate(`
        \n당첨 통계\n${'-'.repeat(20)}
        3개 일치 (${GAME_VALUE.PRIZE[4].toLocaleString()}원) - ${data.fifth}개
        4개 일치 (${GAME_VALUE.PRIZE[3].toLocaleString()}원) - ${data.fourth}개
        5개 일치 (${GAME_VALUE.PRIZE[2].toLocaleString()}원) - ${data.third}개
        5개 일치, 보너스 볼 일치 (${GAME_VALUE.PRIZE[1].toLocaleString()}원) - ${data.second}개
        6개 일치 (${GAME_VALUE.PRIZE[0].toLocaleString()}원) - ${data.first}개
      `)
    );
  }

  if (formattingType === FORMATTING_TYPE.PROFIT_RATE) {
    const formattedRate = data.toLocaleString();
    console.log(`총 수익률은 ${formattedRate}%입니다.`);
  }
};

export default output;
