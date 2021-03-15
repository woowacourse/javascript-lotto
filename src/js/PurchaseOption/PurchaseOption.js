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
    });
  }

  showPurchaseOption() {
    $(ELEMENT.PURCHASE_OPTION_CONTAINER).classList.remove(ELEMENT.HIDDEN);
  }

}

export default PurchaseOption;
