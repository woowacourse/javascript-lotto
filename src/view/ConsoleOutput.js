import Output from "./Output.js";
import { RANK, RANK_CONDITION, RANK_PRIZE } from "../constant/index.js";

class ConsoleOutput extends Output {
  constructor() {
    super();
  }

  printError(message) {
    console.log(message)
  }

  printResult(countsObject, returnOnInvestment) {
    console.log("\n당첨 통계");
    console.log("--------------------");
    Object.values(RANK).toReversed().forEach((rank) => {
      console.log(
        [
          `${RANK_CONDITION[rank].count}개 일치`,
          ...(RANK_CONDITION[rank].hasBonus ? ["보너스 볼 일치"] : []),
        ].join(", ")
        + ` (${RANK_PRIZE[rank].toLocaleString("ko-KR")}원)`
        + ` - ${countsObject[rank]}개`,
      );
    });
    console.log(`총 수익률은 ${returnOnInvestment.toFixed(1)}%입니다.`);
  }

  printPurchasedLottos(lottos) {
    console.log(`${lottos.length}장을 구매했습니다.`);
    lottos.forEach((lotto) =>
      console.log(`[${lotto.getNumbers().join(", ")}]`),
    );
  }
}

export default ConsoleOutput;
