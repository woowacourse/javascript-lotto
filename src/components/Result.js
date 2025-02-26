export const Result = ({ matchingCount, profitRate }) => {
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  const title = document.createElement("div");
  title.classList.add("font-subtitle");
  title.textContent = "🏆 당첨 통계 🏆";

  resultContainer.appendChild(title);
  resultContainer.appendChild(ResultTable());

  return resultContainer;
};

const ResultTable = () => {
  const resultTable = document.createElement("table");

  const headContent = ["일치 갯수", "당첨금", "당첨 갯수"];
  resultTable.appendChild(TableHead(headContent));

  return resultTable;
};

const TableHead = (headContent) => {
  const fragment = document.createDocumentFragment();

  headContent.forEach((i) => {
    const tableHead = document.createElement("th");
    tableHead.textContent = i;
    fragment.appendChild(tableHead);
    return tableHead;
  });

  return fragment;
};

const TableData = ({ matchingCount }) => {
  return;
};
