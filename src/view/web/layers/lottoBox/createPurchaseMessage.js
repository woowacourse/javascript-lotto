import { PROMPT_MESSAGE } from "../../../../constants/message.js";

const createPurchaseMessage = (lottoNumbers) => {
  const purchaseMessage = `${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`;

  const purchaseMessageSpan = document.createElement("span");
  purchaseMessageSpan.id = "purchase-message";
  purchaseMessageSpan.append(purchaseMessage);

  document.getElementById("lotto-container").appendChild(purchaseMessageSpan);
};

export default createPurchaseMessage;
