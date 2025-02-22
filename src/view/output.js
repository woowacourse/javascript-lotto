import { PURCHASE, PRIZE } from "../config/const.js";

const printUserLottos = (price, generatedLottos) => {
  printLottoCount(price);
  generatedLottos.forEach((lotto) => {
    console.log(lotto);
  });
};

const printLottoCount = (price) => {
  console.log(`${Number(price / PURCHASE.UNIT)}개를 구매했습니다.`);
};

const prizeSummary = [
  { count: "3개", prize: PRIZE.FIFTH, label: "fifthPrize" },
  { count: "4개", prize: PRIZE.FOURTH, label: "fourthPrize" },
  { count: "5개", prize: PRIZE.THIRD, label: "thirdPrize" },
  { count: "5개 + 보너스 볼", prize: PRIZE.SECOND, label: "secondPrize" },
  { count: "6개", prize: PRIZE.FIRST, label: "firstPrize" },
];

const printResult = (prizeResult, ROI) => {
  let resultMessage = "";
  resultMessage += "\n당첨 통계\n";
  resultMessage += "--------------------\n";
  resultMessage += prizeSummary
    .map(
      ({ count, prize, label }) =>
        `${count} 일치 (${prize.toLocaleString()}원) - ${prizeResult[label]}개`
    )
    .join("\n");
  resultMessage += `\n총 수익률은 ${ROI}%입니다.`;

  console.log(resultMessage);
};

export { printUserLottos, printResult };
