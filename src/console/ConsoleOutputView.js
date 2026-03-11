import { Console } from "@woowacourse/mission-utils";

export default class ConsoleOutView {
  static printLottos(lottoList) {
    lottoList.forEach((lotto) => {
      Console.print(lotto);
    });
  }

  static printStatistics({ statistics, profitRate }) {
    Console.print("\n당첨 통계");
    Console.print("--------------------");
    statistics.forEach((stat) => {
      Console.print(this.#formatPrizeDetail(stat));
    });
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
    Console.print("");
  }

  static #formatPrizeDetail(prizeDetail) {
    const { matchCount, hasBonus, count, prize } = prizeDetail;
    const formatPrize = prize.toLocaleString();

    if (hasBonus) {
      return `${matchCount}개 일치, 보너스 볼 일치 (${formatPrize}원) - ${count}개`;
    }
    return `${matchCount}개 일치 (${formatPrize}원) - ${count}개`;
  }
}
