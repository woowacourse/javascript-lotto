import prizeResultContents from "./prizeResultModal.html?raw";
import createPrizeTable from "./createPrizeTable";
import createRevenueRateMessage from "./createRevenueRateMessage";
import "./prizeResultModal.css";
import {
  insertTextContents,
  appendContents,
} from "../../utilsWeb/elementCreator";

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
