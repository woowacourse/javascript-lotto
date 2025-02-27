import { LOTTO } from "../config/const";

const printLottoCount = (price) => {
  const lottoContents = document.querySelector(".lotto-contents");
  const lottoCountText = document.createElement("p");
  lottoCountText.className = "body";
  lottoCountText.innerText = `총 ${
    price / LOTTO.PURCHASE.unit
  }개를 구매하였습니다.`;
  lottoContents.appendChild(lottoCountText);
};

const createLottoObject = (lotto) => {
  const lottoContainer = document.createElement("div");
  lottoContainer.className = "lotto-container_lotto";
  const lottoImage = document.createElement("img");
  lottoImage.src = "./src/assets/lotto.png";
  const lottoNumbers = document.createElement("p");
  lottoNumbers.innerText = lotto.numbers.map((number) => number).join(", ");

  lottoContainer.appendChild(lottoImage);
  lottoContainer.appendChild(lottoNumbers);

  return lottoContainer;
};

const printLottos = (lottos) => {
  const lottoContents = document.querySelector(".lotto-contents");
  const lottosContainer = document.createElement("div");

  const lottoObjects = lottos.map((lotto) => createLottoObject(lotto));
  lottoObjects.forEach((lottoObject) => {
    lottosContainer.appendChild(lottoObject);
  });

  lottoContents.appendChild(lottosContainer);
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
  const tableRow = document.createElement("tr");

  const coutCell = document.createElement("td");
  const prizeCell = document.createElement("td");
  const labelCell = document.createElement("td");

  coutCell.innerText = count;
  prizeCell.innerText = prize.toLocaleString();
  labelCell.innerText = `${prizeResult[label]}개`;

  tableRow.appendChild(coutCell);
  tableRow.appendChild(prizeCell);
  tableRow.appendChild(labelCell);

  return tableRow;
};

const printPrizeHeader = () => {
  const resultTable = document.querySelector(".result-table");
  const tableHeader = document.createElement("thead");
  const tableContent = document.createElement("tr");

  const countHeaderCell = document.createElement("th");
  const prizeHeaderCell = document.createElement("th");
  const labelHeaderCell = document.createElement("th");

  countHeaderCell.innerText = "일치 갯수";
  prizeHeaderCell.innerText = "당첨금";
  labelHeaderCell.innerText = "당첨 갯수";

  tableContent.appendChild(countHeaderCell);
  tableContent.appendChild(prizeHeaderCell);
  tableContent.appendChild(labelHeaderCell);

  tableHeader.appendChild(tableContent);
  resultTable.appendChild(tableHeader);
};

const printPrizeResult = (prizeResult) => {
  const tableBody = document.querySelector(".result-table .body");
  prizeSummary.forEach((summary) =>
    tableBody.appendChild(createPrizeRow(summary, prizeResult))
  );
};

const printRateResult = (rate) => {
  const prizeContents = document.querySelector(".prize-contents");
  const restartButton = document.querySelector(".prize-contents button");
  const rateResult = document.createElement("p");
  rateResult.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
  prizeContents.insertBefore(rateResult, restartButton);
};

const printLottoResult = (prizeResult, rate) => {
  // const prizeModal = document.querySelector("modal");
  // prizeModal.style.display = "flex";
  printPrizeHeader();
  printPrizeResult(prizeResult);
  printRateResult(rate);
};

export { printLottoCount, printLottos, printLottoResult };
