import { FORMATTING_TYPE, MESSAGE } from '../../constants/index.js';

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
    console.log(MESSAGE.PRIZE_RESULT(data));
  }

  if (formattingType === FORMATTING_TYPE.PROFIT_RATE) {
    const formattedRate = data.toLocaleString();
    console.log(MESSAGE.PROFIT_RATE_RESULT(formattedRate));
  }
};

export default output;
