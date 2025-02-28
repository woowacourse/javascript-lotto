import prizeResultContents from "./prizeResultModal.html?raw";
import createPrizeTable from "./createPrizeTable";
import createRevenueRateMessage from "./createRevenueRateMessage";
import "./prizeResultModal.css";

const createPrizeResultModal = (result, revenueRate) => {
  const { headerTemplate, rowTemplate } = createPrizeTable(result);
  const revenueRateMessage = createRevenueRateMessage(revenueRate);

  document
    .querySelector("main")
    .insertAdjacentHTML("beforeend", prizeResultContents);

  document
    .querySelector(".prize-table-header")
    .insertAdjacentHTML("beforeend", headerTemplate);

  document
    .querySelector(".prize-table-body")
    .insertAdjacentHTML("beforeend", rowTemplate);

  document.querySelector(".revenue-rate-message").textContent =
    revenueRateMessage;
};

export default createPrizeResultModal;
