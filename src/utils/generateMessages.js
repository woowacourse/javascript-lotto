import { AWARDS_ORDER, AWARDS, GAME } from '../constants/values';

function getMessagesByStatistics(awards, count) {
  switch (awards) {
    case AWARDS.FIFTH_PLACE:
      return `3개 일치 (5,000원) - ${count}개`;

    case AWARDS.FOURTH_PLACE:
      return `4개 일치 (50,000원) - ${count}개`;

    case AWARDS.THIRD_PLACE:
      return `5개 일치 (1,500,000원) - ${count}개`;

    case AWARDS.SECOND_PLACE:
      return `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`;

    case AWARDS.FIRST_PLACE:
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
      .map((lotto) => `[${lotto.getNumbers().join(GAME.NUMBER_MERGER)}]`)
      .join(GAME.LOTTO_MERGER);
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
