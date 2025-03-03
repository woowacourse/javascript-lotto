import { LOTTO } from "../../config/const";
import lottoImg from "../../assets/lotto.png";
import { disableInputPrice } from "./setup";

const printLottoCount = (price) => {
  const $lottoContents = $(".lotto-contents");
  const $lottoCountText = $("<p>")
    .addClass("body")
    .text(`총 ${price / LOTTO.PURCHASE.unit}개를 구매하였습니다.`);

  $lottoContents.append($lottoCountText);
  // disableInputPrice();
};

const createLottoObject = (lotto) => {
  const $lottoContainer = $("<div>").addClass("lotto-container_lotto");
  const $lottoImage = $("<img>").attr("src", lottoImg);
  const $lottoNumbers = $("<p>").text(
    lotto.numbers.map((number) => number).join(", ")
  );

  $lottoContainer.append($lottoImage, $lottoNumbers);

  return $lottoContainer[0];
};

const printLottos = (lottos) => {
  const $lottoContents = $(".lotto-contents");
  const $lottosContainer = $("<div>");

  const lottoObjects = lottos.map((lotto) => createLottoObject(lotto));
  lottoObjects.forEach((lottoObject) => {
    $lottosContainer.append(lottoObject);
  });

  $lottoContents.append($lottosContainer);
};

const prizeSummary = [
  { count: "3개", prize: LOTTO.PRIZES.fifth, label: 3 },
  { count: "4개", prize: LOTTO.PRIZES.fourth, label: 4 },
  { count: "5개", prize: LOTTO.PRIZES.third, label: 5 },
  {
    count: "5개+보너스 볼",
    prize: LOTTO.PRIZES.second,
    label: "5+bonus",
  },
  { count: "6개", prize: LOTTO.PRIZES.first, label: 6 },
];

const createPrizeRow = ({ count, prize, label }, prizeResult) => {
  const $tableRow = $("<tr>");

  const rowData = [count, prize.toLocaleString(), `${prizeResult[label]}개`];

  rowData.forEach((data) => {
    const $cell = $("<td>").text(data);
    $tableRow.append($cell);
  });

  return $tableRow[0]; // jQuery 객체를 DOM 요소로 반환
};

const printPrizeHeader = () => {
  const $resultTable = $(".result-table");

  const headers = ["일치 갯수", "당첨금", "당첨 갯수"];
  const $tableHeader = $("<thead>");
  const $tableRow = $("<tr>");

  headers.forEach((headerText) => {
    const $headerCell = $("<th>").text(headerText);
    $tableRow.append($headerCell);
  });

  $tableHeader.append($tableRow);
  $resultTable.append($tableHeader);
};

const printPrizeResult = (prizeResult) => {
  const $tableBody = $(".result-table .body");
  prizeSummary.forEach((summary) =>
    $tableBody.append(createPrizeRow(summary, prizeResult))
  );
};

const printRateResult = (rate) => {
  const $prizeContents = $(".prize-contents");
  const $restartButton = $(".prize-contents button");
  const $rateResult = $("<p></p>").addClass("prize-contents_rate-result");

  if (rate < 0) rate = 0;

  $rateResult.text(`당신의 총 수익률은 ${rate}%입니다.`);
  $rateResult.insertBefore($restartButton);
};

const printLottoResult = (prizeResult, rate) => {
  printPrizeHeader();
  printPrizeResult(prizeResult);
  printRateResult(rate);
};

export { printLottoCount, printLottos, printLottoResult };
