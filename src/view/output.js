import { LOTTO } from "../config/const.js";

const printUserLottos = (price, lottos) => {
  printLottoCount(price);
  lottos.forEach((userLotto) => {
    console.log(userLotto.numbers);
  });
};

const printLottoCount = (price) => {
  console.log(`${Number(price / LOTTO.PURCHASE.unit)}개를 구매했습니다.`);
};

const prizeSummary = [
  { count: "3개", prize: LOTTO.PRIZES.fifth, label: "fifthPrize" },
  { count: "4개", prize: LOTTO.PRIZES.fourth, label: "fourthPrize" },
  { count: "5개", prize: LOTTO.PRIZES.third, label: "thirdPrize" },
  {
    count: "5개 + 보너스 볼",
    prize: LOTTO.PRIZES.second,
    label: "secondPrize",
  },
  { count: "6개", prize: LOTTO.PRIZES.first, label: "firstPrize" },
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
