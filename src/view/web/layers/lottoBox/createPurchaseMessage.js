import { PROMPT_MESSAGE } from "../../../../constants/message.js";

const createPurchaseMessage = (lottoNumbers) => {
  const purchaseQuantityMessage = `${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`;

  const purchaseMessageSpan = document.createElement("span");
  purchaseMessageSpan.id = "purchase-quantity-message";
  purchaseMessageSpan.append(purchaseQuantityMessage);

  document.getElementById("lotto-container").appendChild(purchaseMessageSpan);
};

export default createPurchaseMessage;
