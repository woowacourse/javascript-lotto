import { STATISTICS_MESSAGE } from '../constants';

const outputView = {
  printLottos(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      console.log(`[${lotto.join(', ')}]`);
    });
  },

  printStatistics(rankings, rewardRate) {
    console.log('\n당첨 통계');
    console.log('--------------------');
    Object.entries(STATISTICS_MESSAGE)
      .reverse()
      .forEach(([rankingForOutput, message]) => {
        const rankingCount = rankings.filter(
          (ranking) => ranking === Number(rankingForOutput)
        ).length;
        console.log(`${message} - ${rankingCount}개`);
      });

    console.log(`총 수익률은 ${rewardRate}입니다.`);
  },

  printErrorMessage(error) {
    console.log(`[${error.name}] ${error.message}`);
  },
};

export default outputView;
