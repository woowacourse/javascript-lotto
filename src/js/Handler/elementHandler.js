import { ELEMENT } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

export const showPurchaseResult = () => {
  $(ELEMENT.RECEIPT_CONTAINER).classList.remove(ELEMENT.HIDDEN);
  $(ELEMENT.WIN_NUMBER_CONTAINER).classList.remove(ELEMENT.HIDDEN);
};

export const resetPurchaseResult = () => {
  $(ELEMENT.RECEIPT_CONTAINER).classList.add(ELEMENT.HIDDEN);
  $(ELEMENT.WIN_NUMBER_CONTAINER).classList.add(ELEMENT.HIDDEN);
  $(ELEMENT.TOGGLE_BUTTON).checked = false;
};

export const showPurchaseOption = () => {
  $(ELEMENT.PURCHASE_OPTION_CONTAINER).classList.remove(ELEMENT.HIDDEN);
};

export const showModal = () => {
  $(ELEMENT.MODAL).classList.add(ELEMENT.OPEN);
};

export const closeModal = () => {
  $(ELEMENT.MODAL).classList.remove(ELEMENT.OPEN);
};
