import { FORMATTING_TYPE } from '../constants/index.js';

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
    console.log(`\n당첨 통계\n${'-'.repeat(20)}`);
    console.log(`3개 일치 (5,000원) - ${data.fifth}개
4개 일치 (50,000원) - ${data.fourth}개
5개 일치 (1,500,000원) - ${data.third}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${data.second}개
6개 일치 (2,000,000,000원) - ${data.first}개`);
  }

  if (formattingType === FORMATTING_TYPE.PROFIT_RATE) {
    const formattedRate = data.toLocaleString();
    console.log(`총 수익률은 ${formattedRate}%입니다.`);
  }
};

export default output;
