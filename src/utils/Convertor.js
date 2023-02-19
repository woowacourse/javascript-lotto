import { GameControlStaticValue } from '../constants/Constants.js';

const CovertMessage = {
  stringifyLotto(lotto) {
    return `[${lotto.join(GameControlStaticValue.PRINT_SEPARATOR)}]`;
  },

  purchaseCount(num) {
    return `${num}개를 구매했습니다.`;
  },

  lottoRank(ranks) {
    return [
      `3개 일치 (5,000원) - ${ranks[5]}개`,
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${ranks[4]}개`,
      `5개 일치 (1,500,000원) - ${ranks[3]}개`,
      `6개 일치 (2,000,000,000원) - ${ranks[2]}개`,
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${ranks[1]}개`,
    ].join('\n');
  },

  profitRateResult(profitRate) {
    return `총 수익률은 ${profitRate}%입니다.`;
  },
};

export default CovertMessage;
