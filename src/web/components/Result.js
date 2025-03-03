import { LOTTO_PRIZE } from "../../common/lottoConstants/systemConstants.js";
import formatNumber from "../../common/util/formatNumber.js";
import { RetryController } from "../controller/RetryController.js";
import { removeModal } from "../util/modalActions.js";
import { Button } from "./Button.js";

export const Result = ({ matchingCount, profitRate }) => {
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  const title = document.createElement("div");
  title.classList.add("font-subtitle");
  title.textContent = "🏆 당첨 통계 🏆";

  const exitIcon = ExitIcon();

  const resultProfit = document.createElement("div");
  resultProfit.classList.add("font-weight-body");
  resultProfit.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;

  resultContainer.appendChild(exitIcon);
  resultContainer.appendChild(title);
  resultContainer.appendChild(ResultTable({ matchingCount: matchingCount }));
  resultContainer.appendChild(resultProfit);
  resultContainer.appendChild(Button({ label: "다시 시작하기", style: "large", name: "retry", onClick: RetryController }));

  return resultContainer;
};

const ExitIcon = () => {
  const exitIconContainer = document.createElement("div");
  exitIconContainer.classList.add("exit-icon-container");

  const exitIcon = document.createElement("img");
  exitIcon.src = `./close.png`;
  exitIcon.classList.add("exit-icon");

  exitIconContainer.appendChild(exitIcon);

  exitIconContainer.addEventListener("click", () => {
    removeModal();
  });
  return exitIconContainer;
};

const ResultTable = ({ matchingCount }) => {
  const resultTable = document.createElement("table");

  const headContent = ["일치 갯수", "당첨금", "당첨 갯수"];
  resultTable.appendChild(TableHead(headContent));

  Object.keys(matchingCount).forEach((count) => {
    const tableData = {
      matchingCount: `${count}개`,
      prize: formatNumber(LOTTO_PRIZE[count]),
      winningCount: matchingCount[count],
    };
    if (count === "bonus") {
      tableData.matchingCount = "5개+보너스볼";
    }
    resultTable.appendChild(TableData(tableData));
  });

  return resultTable;
};

const TableHead = (headContent) => {
  const tableRow = document.createElement("tr");
  const fragment = document.createDocumentFragment();

  headContent.forEach((i) => {
    const tableHead = document.createElement("th");
    tableHead.textContent = i;
    fragment.appendChild(tableHead);
    return tableHead;
  });

  tableRow.appendChild(fragment);

  return tableRow;
};

const TableData = ({ matchingCount = "n개", prize = "5000원", winningCount = "n개" }) => {
  const tableRow = document.createElement("tr");
  const fragment = document.createDocumentFragment();

  fragment.appendChild(createTableData(matchingCount));
  fragment.appendChild(createTableData(prize));
  fragment.appendChild(createTableData(winningCount));

  tableRow.appendChild(fragment);

  return tableRow;
};

const createTableData = (text) => {
  const tableData = document.createElement("td");
  tableData.textContent = text;
  return tableData;
};
