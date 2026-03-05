import Console from "../utils/Console.js";
import { AMOUNT_PRICE } from "../constants/lottoConstants.js";

export class OutputView {
  printAmount(price) {
    const amount = price / AMOUNT_PRICE;
    return Console.print(`${amount}개를 구매했습니다.`);
  }
  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto.toString());
    });
  }
  printStatistics(statistics) {
    Console.print("당첨 통계");
    Console.print("--------------------");

    // (0원) - 1개 // 꼴등
    // 3개 일치 (5,000원) - 1개 // 5등
    // 4개 일치 (50,000원) - 0개 // 4등
    // 5개 일치 (1,500,000원) - 0개 // 3등
    // 5개 일치, 보너스 볼 일치 (30,000,000원) - 0개 // 2등
    // 6개 일치 (2,000,000,000원) - 0개 // 1등

    Console.print(`3개 일치 (5,000원) - ${statistics["5"]}개`); // 5등
    Console.print(`4개 일치 (50,000원) - ${statistics["4"]}개`); // 4등
    Console.print(`5개 일치 (1,500,000원) - ${statistics["3"]}개`); // 3등
    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics["2"]}개`,
    ); // 2등
    Console.print(`6개 일치 (2,000,000,000원) - ${statistics["1"]}개`); // 1등
  }
  printRate(rate) {
    Console.print(`총 수익률은 ${rate}%입니다.`);
  }
}

export default OutputView;
