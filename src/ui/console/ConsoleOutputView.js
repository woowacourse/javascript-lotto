import { Console } from "@woowacourse/mission-utils";

const PREFIX = "[ERROR]";

export default class ConsoleOutView {
  static printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  }

  static printStatistics(prizeStats) {
    Console.print("\n당첨 통계");
    Console.print("--------------------");
    prizeStats.forEach((stats) => {
      Console.print(this.printRank(stats));
    });
  }

  static printProfit(profit) {
    Console.print(`총 수익률은 ${profit}%입니다.`);
    Console.print("");
  }

  static printRank(stats) {
    const { matchCount, hasBonus, count, prize } = stats;
    const formatPrize = prize.toLocaleString();

    if (hasBonus) {
      return `${matchCount}개 일치, 보너스 볼 일치 (${formatPrize}원) - ${count}개`;
    }
    return `${matchCount}개 일치 (${formatPrize}원) - ${count}개`;
  }

  static printError(error) {
    Console.print(PREFIX + error.message);
  }
}
