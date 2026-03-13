import { PRIZE, RANK_MAP } from "../Utils/Constants.js";

const OutputView = {
  printLottoList(lottos) {
    const lottoCount = document.querySelector("#lotto-count");

    lottoCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
  },

  printMatchResult(result) {
    Console.print("\n당첨 통계");
    Console.print("--------------------");

    // 등수별 결과 출력
    for (const key in result) {
      const prize = PRIZE[key].toLocaleString();
      const count = result[key];
      Console.print(`${RANK_MAP[key]} (${prize}원) - ${count}개`);
    }
  },

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  },

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },
};

export default OutputView;
