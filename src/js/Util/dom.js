import { ELEMENT } from "./constants.js";
import { $ } from "./querySelector.js";

export const showPurchaseResult = () => {
  $(ELEMENT.RECEIPT_CONTAINER).classList.remove(ELEMENT.HIDDEN);
  $(ELEMENT.WIN_NUMBER_CONTAINER).classList.remove(ELEMENT.HIDDEN);
};

export const hidePurchaseResult = () => {
  $(ELEMENT.RECEIPT_CONTAINER).classList.add(ELEMENT.HIDDEN);
  $(ELEMENT.WIN_NUMBER_CONTAINER).classList.add(ELEMENT.HIDDEN);
};

export const showModal = () => {
  $(ELEMENT.MODAL).classList.add(ELEMENT.OPEN);
};

export const closeModal = () => {
  $(ELEMENT.MODAL).classList.remove(ELEMENT.OPEN);
};

export const showPurchaseSection = () => {
  $(ELEMENT.PURCHASE_SECTION).classList.remove(ELEMENT.HIDDEN);
};

export const hidePurchaseSection = () => {
  $(ELEMENT.PURCHASE_SECTION).classList.add(ELEMENT.HIDDEN);
};
