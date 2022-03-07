import { SELECTOR } from "../utils/constants.js";
import { $, setDisabled } from "../utils/dom.js";

export default class PurchaseView {
  constructor() {
    this.purchaseInput = $(SELECTOR.PURCHASE_INPUT);
    this.purchaseButton = $(SELECTOR.PURCHASE_BUTTON);
    this.purchaseForm = $(SELECTOR.PURCHASE_FORM);
    this.purchaseInfomation = $(SELECTOR.PURCHASE_INFOMATION);
  }

  bindPurchase(handler) {
    $(SELECTOR.PURCHASE_FORM).addEventListener("submit", handler);
  }

  resetPurchaseInfomation() {
    this.purchaseInfomation.innerText = "구매한 로또가 없습니다.";
  }

  renderPurchaseInfomation(count) {
    this.purchaseInfomation.innerText = `총 ${count}개를 구매하였습니다.`;
  }

  disablePurchaseForm() {
    setDisabled(this.purchaseInput);
    setDisabled(this.purchaseButton);
  }

  enablePurchaseForm() {
    setEnabled(this.purchaseInput);
    setEnabled(this.purchaseButton);
  }
}
