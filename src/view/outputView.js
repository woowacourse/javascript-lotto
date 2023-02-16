const outputView = {
  statisticsMessage: {
    5: '3개 일치 (5,000원)',
    4: '4개 일치 (50,000원)',
    3: '5개 일치 (1,500,000원)',
    2: '5개 일치, 보너스 볼 일치 (30,000,000원)',
    1: '6개 일치 (2,000,000,000원)',
  },

  printLottos(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      console.log(`[${lotto.join(', ')}]`);
    });
  },

  printStatistics(rankings, rewardRate) {
    console.log('\n당첨 통계');
    console.log('--------------------');
    [5, 4, 3, 2, 1].forEach((rankingForOutput) => {
      const rankingCount = rankings.filter((ranking) => ranking === rankingForOutput).length;
      console.log(`${outputView.statisticsMessage[rankingForOutput]} - ${rankingCount}개`);
    });

    console.log(`총 수익률은 ${rewardRate}입니다.`);
  },

  printErrorMessage(error) {
    console.log(error.message);
  },
};

export default outputView;
