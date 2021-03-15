import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE, STANDARD_NUMBER } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class PurchaseOption {
  constructor() {
    $(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).addEventListener("click", () => {
      messenger.dispatchMessage(MESSAGE.AUTO_NUMBER_PURCHASE_BUTTON_CLICKED);
    });

    messenger.addMessageListener(MESSAGE.MONEY_SUBMITTED, ({ money }) => {
      this.money = Number(money);
      this.autoNumberTicketCount = 0;
      this.manualNumberTicketCount = 0;

      this.showPurchaseOption();
      this.render();
    });

    messenger.addMessageListener(
      MESSAGE.AUTO_NUMBER_PURCHASE_BUTTON_CLICKED,
      () => {
        this.money -= STANDARD_NUMBER.ONE_TICKET_PRICE;
        this.autoNumberTicketCount += 1;
        this.render();
      }
    );
  }

  showPurchaseOption() {
    $(ELEMENT.PURCHASE_OPTION_CONTAINER).classList.remove(ELEMENT.HIDDEN);
  }

  render() {
    this.renderBlance();
    this.renderPurchaseStatus();
  }

  renderBlance() {
    $(
      ELEMENT.PURCHASE_BALANCE_LABEL
    ).innerText = `잔액 : ${this.money.toLocaleString()}원`;
  }

  renderPurchaseStatus() {
    $(
      ELEMENT.PURCHASE_STATUS_LABEL
    ).innerText = `구매 현황: 자동 ${this.autoNumberTicketCount}장, 수동 ${this.manualNumberTicketCount} 장`;
  }
}

export default PurchaseOption;
