import { LOTTO_PRIZE_MONEY_DEFINITION } from '../Domain/Constant/definition.js';
export const outputView = {
  printLottoCount(lottoCounts) {
    console.log(`${lottoCounts}개를 구매했습니다.`);
  },
  printLottoList(lottoList) {
    lottoList.forEach((lotto) => {
      console.log(`[${lotto.getNumbers().join(', ')}]`);
    });
    console.log('');
  },
  printLottoResultInstruction() {
    console.log('');
    console.log('당첨 통계');
    console.log('--------------------');
  },
  printLottoResult(lottoResult) {
    const message = {
      FIRST_PRIZE: `6개 일치 (${LOTTO_PRIZE_MONEY_DEFINITION.FIRST_PRIZE.toLocaleString()}원) - ${lottoResult.FIRST_PRIZE}개`,
      SECOND_PRIZE: `5개 일치, 보너스 볼 일치 (${LOTTO_PRIZE_MONEY_DEFINITION.SECOND_PRIZE.toLocaleString()}원) - ${lottoResult.SECOND_PRIZE}개`,
      THIRD_PRIZE: `5개 일치 (${LOTTO_PRIZE_MONEY_DEFINITION.THIRD_PRIZE.toLocaleString()}원) - ${lottoResult.THIRD_PRIZE}개`,
      FOURTH_PRIZE: `4개 일치 (${LOTTO_PRIZE_MONEY_DEFINITION.FOURTH_PRIZE.toLocaleString()}원) - ${lottoResult.FOURTH_PRIZE}개`,
      FIFTH_PRIZE: `3개 일치 (${LOTTO_PRIZE_MONEY_DEFINITION.FIFTH_PRIZE.toLocaleString()}원) - ${lottoResult.FIFTH_PRIZE}개`,
    };
    const keys = [
      'FIFTH_PRIZE',
      'FOURTH_PRIZE',
      'THIRD_PRIZE',
      'SECOND_PRIZE',
      'FIRST_PRIZE',
    ];

    keys.forEach((key) => {
      console.log(message[key]);
    });
    console.log('');
  },
  printProfit(profit) {
    console.log(
      `총 수익률은 ${Number(profit.toFixed(1)).toLocaleString()}%입니다.`
    );
  },
};
