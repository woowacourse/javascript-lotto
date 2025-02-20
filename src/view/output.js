import {
  FIFTH_PRIZE,
  FIRST_PRIZE,
  FOURTH_PRIZE,
  PURCHASE_UNIT,
  SECOND_PRIZE,
  THIRD_PRIZE,
} from "../config/const.js";

const printUserLottos = (userLottos) => {
  printLottoCount(userLottos.price);
  userLottos.lottos.forEach((userLotto) => {
    console.log(userLotto.numbers);
  });
};

const printLottoCount = (price) => {
  console.log(`${Number(price / PURCHASE_UNIT)}개를 구매했습니다.`);
};

const prizeSummary = [
  { count: "3개", prize: FIFTH_PRIZE, label: "fifthPrize" },
  { count: "4개", prize: FOURTH_PRIZE, label: "fourthPrize" },
  { count: "5개", prize: THIRD_PRIZE, label: "thirdPrize" },
  { count: "5개 + 보너스 볼", prize: SECOND_PRIZE, label: "secondPrize" },
  { count: "6개", prize: FIRST_PRIZE, label: "firstPrize" },
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
