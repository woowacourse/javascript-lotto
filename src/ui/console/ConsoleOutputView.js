import { Console } from "@woowacourse/mission-utils";

const PREFIX = "[ERROR]";

export default class ConsoleOutView {
  static printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  }

  static printStatistics({ formatPrizeList, profitRate }) {
    Console.print("\n당첨 통계");
    Console.print("--------------------");
    formatPrizeList.forEach((element) => {
      Console.print(this.#printRank(element));
    });
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
    Console.print("");
  }

  static #printRank(element) {
    const { matchCount, hasBonus, count, prize } = element;
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
