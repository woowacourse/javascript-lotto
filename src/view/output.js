import { PURCHASE_UNIT } from "../config/const.js";

const printUserLottos = (userLottos) => {
  printLottoCount(userLottos.price);
  userLottos.lottos.forEach((userLotto) => {
    console.log(userLotto.numbers);
  });
};

const printLottoCount = (price) => {
  console.log(`${Number(price / PURCHASE_UNIT)}개를 구매했습니다.`);
};

const printResult = (prizeResult, ROI) => {
  let resultMessage = "";
  resultMessage += "\n당첨 통계\n";
  resultMessage += "--------------------\n";
  resultMessage += `3개 일치 (5,000원) - ${prizeResult.fifthPrize}개\n`;
  resultMessage += `4개 일치 (50,000원) - ${prizeResult.fourthPrize}개\n`;
  resultMessage += `5개 일치 (1,500,000원) - ${prizeResult.thirdPrize}개\n`;
  resultMessage += `5개 일치, 보너스 볼 일치 (30,000,000원) - ${prizeResult.secondPrize}개\n`;
  resultMessage += `6개 일치 (2,000,000,000원) - ${prizeResult.firstPrize}개\n`;
  resultMessage += `총 수익률은 ${ROI}%입니다.`;

  console.log(resultMessage);
};

export { printUserLottos, printResult };
