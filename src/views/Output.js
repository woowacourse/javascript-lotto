import { MATCH_KEY, MIN_UNIT, MATCH_PRIZE } from "../constants/constants.js";

const Output = {
  printErrorMessage(errorMessage) {
    console.log(`[ERROR] ${errorMessage}\n`);
  },

  printIssuedLottos(purchaseAmount, lottos) {
    const lottoCount = purchaseAmount / MIN_UNIT;
    console.log(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach((lotto) => console.log(`[${lotto.join(", ")}]`));
  },

  printStatistics(statistics) {
    console.log("\n당첨 통계\n--------------------");
    console.log(
      `${MATCH_KEY.THREE}개 일치 (${MATCH_PRIZE.THREE.toLocaleString()}원) - ${statistics.get(MATCH_KEY.THREE).count}개`,
    );
    console.log(
      `${MATCH_KEY.FOUR}개 일치 (${MATCH_PRIZE.FOUR.toLocaleString()}원) - ${statistics.get(MATCH_KEY.FOUR).count}개`,
    );
    console.log(
      `${MATCH_KEY.FIVE}개 일치 (${MATCH_PRIZE.FIVE.toLocaleString()}원) - ${statistics.get(MATCH_KEY.FIVE).count}개`,
    );
    console.log(
      `${MATCH_KEY.FIVE}개 일치, 보너스 볼 일치 (${MATCH_PRIZE.FIVE_AND_BONUS.toLocaleString()}원) - ${statistics.get(MATCH_KEY.FIVE_AND_BONUS).count}개`,
    );
    console.log(
      `${MATCH_KEY.SIX}개 일치 (${MATCH_PRIZE.SIX.toLocaleString()}원) - ${statistics.get(MATCH_KEY.SIX).count}개`,
    );
  },

  printProfitRatio(profitRatio) {
    console.log(`총 수익률은 ${profitRatio}%입니다.`);
  },
};

export default Output;
