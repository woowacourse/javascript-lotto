import prizeResultContents from "./prizeResultModal.html?raw";
import createPrizeTable from "./createPrizeTable.js";
import createRevenueRateMessage from "./createRevenueRateMessage.js";
import "./prizeResultModal.css";
import {
  insertTextContents,
  appendContents,
} from "../../../../../utils/view/elementCreator.js";

const createPrizeResultModal = (result, revenueRate) => {
  const { headerTemplate, rowTemplate } = createPrizeTable(result);
  const revenueRateMessage = createRevenueRateMessage(revenueRate);

  appendContents(
    ".prize-result-modal",
    ".result-container",
    prizeResultContents,
  );

  appendContents(".prize-table-header", "th", headerTemplate);
  appendContents(".prize-table-body", "td", rowTemplate);
  insertTextContents(".revenue-rate-message", revenueRateMessage);
};

export default createPrizeResultModal;
