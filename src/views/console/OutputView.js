import { MATCH_KEY, MATCH_PRIZE } from "../../constants/constants.js";

const OutputView = {
  printErrorMessage(errorMessage) {
    console.log(`[ERROR] ${errorMessage}\n`);
  },

  printIssuedLottos(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => console.log(`[${lotto.join(", ")}]`));
  },

  printStatistics(statistics) {
    console.log("\n당첨 통계\n--------------------");

    Object.values(MATCH_KEY).forEach((key) => {
      if (key === MATCH_KEY.FIVE_AND_BONUS) {
        console.log(
          `${MATCH_KEY.FIVE}개 일치, 보너스 볼 일치 (${MATCH_PRIZE[key].toLocaleString()}원) - ${statistics.get(key).count}개`,
        );
        return;
      }
      console.log(
        `${key}개 일치 (${MATCH_PRIZE[key].toLocaleString()}원) - ${statistics.get(key).count}개`,
      );
    });
  },

  printProfitRatio(profitRatio) {
    console.log(`총 수익률은 ${profitRatio}%입니다.`);
  },
};

export default OutputView;
