import { $ } from "./Util/querySelector.js";
import {
  handlePurchaseAmountSubmit,
  handleToggleButton,
} from "./Controller/submitController.js";
import { hidePurchaseResult } from "./Handler/elementHandler.js";
import { Element } from "./Util/constants.js";

class App {
  constructor() {
    this.intializeTickets();

    $(Element.PURCHASE_AMOUNT_SUBMIT_BUTTON).addEventListener(
      "click",
      handlePurchaseAmountSubmit
    );
    $(Element.TOGGLE_BUTTON).addEventListener("click", handleToggleButton);
  }

  intializeTickets() {
    this.tickets = [];
    this.ticketCount = 0;
  }
}

export const app = new App();
