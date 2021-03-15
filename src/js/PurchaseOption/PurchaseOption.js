import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class PurchaseOption {
  constructor() {
    messenger.addMessageListener(MESSAGE.MONEY_SUBMITTED, ({ money }) => {
      this.money = money;
      this.autoNumberTicketCount = 0;
      this.manualNumberTicketCount = 0;

      this.showPurchaseOption();
      this.render();
    });
  }

  showPurchaseOption() {
    $(ELEMENT.PURCHASE_OPTION_CONTAINER).classList.remove(ELEMENT.HIDDEN);
  }

  render() {
    this.renderBlance();
    this.renderPurchaseStatus();
  }

  renderBlance() {
    $(ELEMENT.PURCHASE_BALANCE_LABEL).innerText = `잔액 : ${Number(
      this.money
    ).toLocaleString()}원`;
  }

  renderPurchaseStatus() {
    $(
      ELEMENT.PURCHASE_STATUS_LABEL
    ).innerText = `구매 현황: 자동 ${this.autoNumberTicketCount}장, 수동 ${this.manualNumberTicketCount} 장`;
  }
}

export default PurchaseOption;
