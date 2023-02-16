import {
  NUMBER_MERGER,
  LOTTO_MERGER,
  AWARDS_ORDER,
  FIFTH_PLACE,
  FIRST_PLACE,
  FOURTH_PLACE,
  SECOND_PLACE,
  THIRD_PLACE,
} from '../constants/values';

function getMessagesByStatistics(awards, count) {
  switch (awards) {
    case FIFTH_PLACE:
      return `3개 일치 (5,000원) - ${count}개`;

    case FOURTH_PLACE:
      return `4개 일치 (50,000원) - ${count}개`;

    case THIRD_PLACE:
      return `5개 일치 (1,500,000원) - ${count}개`;

    case SECOND_PLACE:
      return `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`;

    case FIRST_PLACE:
      return `6개 일치 (2,000,000,000원) - ${count}개`;

    default:
      return null;
  }
}

const generateMessages = Object.freeze({
  countMessage(count) {
    return `${count}개 구매했습니다.`;
  },

  lottoList(lottoList) {
    return lottoList
      .map((lotto) => `[${lotto.getNumbers().join(NUMBER_MERGER)}]`)
      .join(LOTTO_MERGER);
  },

  statisticsMessage(statistics) {
    return AWARDS_ORDER.map((awards) =>
      getMessagesByStatistics(awards, statistics[awards] || 0)
    ).join('\n');
  },

  earningRateMessage(earningRate) {
    return `총 수익률은 ${earningRate}%입니다.`;
  },

  result({ statistics, earningRate }) {
    return [
      generateMessages.statisticsMessage(statistics),
      generateMessages.earningRateMessage(earningRate),
    ].join('\n');
  },
});

export default generateMessages;
