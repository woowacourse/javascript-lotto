import { WINNING_DATA } from "../constants/lottoInfo.js";

const OutputView = {
  printLotto(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      console.log(lotto);
    });
  },

  printResult(rankCount, profitRate) {
    console.log("\n당첨 통계");
    console.log("--------------------");
    for (let rank = 5; rank >= 1; rank--)
      console.log(`${WINNING_DATA[rank]} - ${rankCount[rank]}개`);

    const profitRateStr = profitRate.toLocaleString("ko-KR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    console.log(`총 수익률은 ${profitRateStr}%입니다.`);
  },
};

export default OutputView;
