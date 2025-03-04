import {
  appendContents,
  insertTextContents,
} from "../../../../utils/view/elementCreator.js";
import createLottoList from "./createLottoList.js";
import createPurchaseMessage from "./createPurchaseMessage.js";
import "./lottoBox.css";

const createLottoBox = (lottoNumbers) => {
  const purchaseMessage = createPurchaseMessage(lottoNumbers);
  const lottoList = createLottoList(lottoNumbers);

  insertTextContents(".purchase-message", purchaseMessage);
  appendContents(".lotto-list", ".lotto-numbers", lottoList);
};

export default createLottoBox;
