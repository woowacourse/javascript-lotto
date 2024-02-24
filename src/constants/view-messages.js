import prize from '../domain/prize.js';
import formatNumber from '../utils/formatNumber.js';

import { LOTTO_PRICE } from './lotto-constants.js';

export const INPUT_MESSAGE = {
  PURCHASE_AMOUNT: '\n> 구입금액을 입력해 주세요. ',
  WINNING_LOTTO: '\n> 당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '\n> 보너스 볼을 입력해 주세요. ',
  RESTART_GAME: '\n> 다시 시작하시겠습니까? (y/n) ',
};

export const OUTPUT_MESSAGE = {
  PURCHASE_NUMBER: (purchaseAmount) => `${purchaseAmount / LOTTO_PRICE}개를 구매했습니다.`,
  RESULT_HEADER: '\n당첨 통계\n--------------------',

  RESULT: (totalResult, rank) =>
    `${prize.findMatchCountByRank(rank)}개 일치${
      prize.findIsBonusByRank(rank) ? ', 보너스 볼 일치 ' : ' '
    }(${formatNumber(prize.findRewardByRank(rank))}원) - ${totalResult[rank]}개`,

  PROFIT: (profit) => `총 수익률은 ${formatNumber(profit)}%입니다.`,
};
