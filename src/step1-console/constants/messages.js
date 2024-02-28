import { LOTTO_RANK } from "./lotto.js";

export const outputMessageFormatter = {
  lottoResult: (rankResult, profitRate) =>
    `
당첨 통계
--------------------
3개 일치 (5,000원) - ${rankResult[LOTTO_RANK.fifth]}개
4개 일치 (50,000원) - ${rankResult[LOTTO_RANK.fourth]}개
5개 일치 (1,500,000원) - ${rankResult[LOTTO_RANK.third]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankResult[LOTTO_RANK.second]}개
6개 일치 (2,000,000,000원) - ${rankResult[LOTTO_RANK.first]}개
총 수익률은 ${profitRate.toLocaleString()}%입니다.
  `,
};
