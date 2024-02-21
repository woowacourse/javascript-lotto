import { PRIZE } from "../constants/system.js";
import formatNumber from "../utils/FormatNumber.js";

const OutputView = {
  printError(error) {
    console.log(error);
  },

  printPurchaseMessage(purchaseAmount) {
    console.log(`${purchaseAmount / 1000}개를 구매했습니다.`);
  },

  printLottos(lottoNumberArray) {
    lottoNumberArray.forEach((lottoNumber) => {
      console.log(lottoNumber.sort((a, b) => a - b));
    });
  },

  printResultHeader() {
    console.log("\n당첨 통계");
    console.log("---------");
  },

  printResult(rank) {
    this.printResultHeader();
    Object.keys(rank)
      .reverse()
      .forEach((key) => {
        console.log(
          `${PRIZE[key].match}개 일치${PRIZE[key].bonus ? ", 보너스 볼 일치" : ""}(${
            PRIZE[key].reward
          }원)- ${rank[key]}개`,
        );
      });
  },

  printProfit(profit) {
    console.log(`총 수익률은 ${profit}%입니다.`);
  },
};
export default OutputView;
