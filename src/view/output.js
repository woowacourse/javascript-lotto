import { FORMATTING_TYPE, GAME_VALUE, RANK } from '../constants/index.js';

const output = (data, formattingType = '') => {
  if (formattingType === '') {
    return console.log(data);
  }

  if (formattingType === FORMATTING_TYPE.BOUGHT_LOTTOS) {
    console.log(`${data.length}개를 구매했습니다.`);

    return data.forEach((lotto) => console.log(`[${lotto.join(', ')}]`));
  }

  if (formattingType === FORMATTING_TYPE.WINNING_STATUS) {
    console.log(`\n당첨 통계\n${'-'.repeat(20)}`);
    console.log(`3개 일치 (${GAME_VALUE.PRIZE[4].toLocaleString()}원) - ${data[RANK.FIFTH]}개
4개 일치 (${GAME_VALUE.PRIZE[3].toLocaleString()}원) - ${data[RANK.FOURTH]}개
5개 일치 (${GAME_VALUE.PRIZE[2].toLocaleString()}원) - ${data[RANK.THIRD]}개
5개 일치, 보너스 볼 일치 (${GAME_VALUE.PRIZE[1].toLocaleString()}원) - ${data[RANK.SECOND]}개
6개 일치 (${GAME_VALUE.PRIZE[0].toLocaleString()}원) - ${data[RANK.FIRST]}개`);
  }

  if (formattingType === FORMATTING_TYPE.PROFIT_RATE) {
    const formattedRate = data.toLocaleString();
    console.log(`총 수익률은 ${formattedRate}%입니다.`);
  }
};

export default output;
