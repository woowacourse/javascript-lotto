import { PROMPT_MESSAGE } from "../../../../constants/message.js";

const createPurchaseMessage = (lottoNumbers) => {
  const purchaseMessage = `${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`;
  return purchaseMessage;
};

export default createPurchaseMessage;
