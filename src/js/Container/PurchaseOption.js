import messenger from "../Messenger.js";
import {
  ELEMENT,
  ALERT_MESSAGE,
  MESSAGE,
  STANDARD_NUMBER,
} from "../Util/constants.js";
import { clearInput, hideContainer, showContainer } from "../Util/DOM.js";
import { $ } from "../Util/querySelector.js";

class PurchaseOption {
  constructor() {
    $(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).addEventListener("click", () => {
      if (!this.validateBalance()) return;

      messenger.dispatchMessage(MESSAGE.AUTO_NUMBER_PURCHASE_BUTTON_CLICKED);
    });

    $(ELEMENT.MANUAL_NUMBER_PURCHASE_BUTTON).addEventListener("click", () => {
      if (!this.validateBalance()) return;

      messenger.dispatchMessage(MESSAGE.MANUAL_NUMBER_PURCHASE_BUTTON_CLICKED);
    });

    $(ELEMENT.PURCHASE_PAYMENT_BUTTON).addEventListener("click", () => {
      if (
        confirm(
          `현재 자동 구매 ${this.autoNumberTicketCount} 장, 수동 구매 ${this.manualNumberTicketCount} 장을 구매하셨습니다.\n확인을 누르시면 티켓이 발급됩니다.\n(잔액이 남아있는 경우, 자동 번호로 진행됩니다.)`
        )
      ) {
        messenger.dispatchMessage(MESSAGE.PURCHASE_PAYMENT_BUTTON_CLICKED, {
          balance: this.money / STANDARD_NUMBER.ONE_TICKET_PRICE,
        });
      }
    });

    messenger.addMessageListener(MESSAGE.MONEY_SUBMITTED, ({ money }) => {
      this.money = Number(money);
      this.autoNumberTicketCount = 0;
      this.manualNumberTicketCount = 0;

      showContainer(ELEMENT.PURCHASE_OPTION_CONTAINER);
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

    messenger.addMessageListener(MESSAGE.MANUAL_NUMBERS_CREATED, () => {
      this.money -= STANDARD_NUMBER.ONE_TICKET_PRICE;
      this.manualNumberTicketCount += 1;
      clearInput(ELEMENT.MANUAL_NUMBER);
      this.render();
    });

    messenger.addMessageListener(MESSAGE.MANUAL_NUMBERS_NOT_CREATED, () => {
      clearInput(ELEMENT.MANUAL_NUMBER);
    });

    messenger.addMessageListener(MESSAGE.TICKET_ADDED_AS_BALANCE, () => {
      hideContainer(ELEMENT.PURCHASE_OPTION_CONTAINER);
    });

    messenger.addMessageListener(MESSAGE.RESTART_BUTTON_CLICKED, () => {
      clearInput(ELEMENT.MANUAL_NUMBER);
    });
  }

  render() {
    this.renderBalance();
    this.renderPurchaseStatus();
  }

  renderBalance() {
    $(
      ELEMENT.PURCHASE_BALANCE_LABEL
    ).innerText = `잔액 : ${this.money.toLocaleString()}원`;
  }

  renderPurchaseStatus() {
    $(
      ELEMENT.PURCHASE_STATUS_LABEL
    ).innerText = `구매 현황: 자동 ${this.autoNumberTicketCount} 장, 수동 ${this.manualNumberTicketCount} 장`;
  }

  validateBalance() {
    if (this.money === 0) {
      alert(ALERT_MESSAGE.NO_BALANCE);

      return;
    }
    return true;
  }
}

export default PurchaseOption;
