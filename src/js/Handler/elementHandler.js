import { Element } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

export const showPurchaseResult = () => {
  $(Element.RECEIPT_CONTAINER).classList.remove(Element.HIDDEN);
  $(Element.WIN_NUMBER_CONTAINER).classList.remove(Element.HIDDEN);
};

export const hidePurchaseResult = () => {
  $(Element.RECEIPT_CONTAINER).classList.add(Element.HIDDEN);
  $(Element.WIN_NUMBER_CONTAINER).classList.add(Element.HIDDEN);
};
