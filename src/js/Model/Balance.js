import { STANDARD_NUMBER } from "../Util/constants.js";

export default class Balance {
  constructor(money) {
    this.initialBalance = money;
    this.balance = money;
  }

  subtractionManualPurchaseBalance() {
    this.balance -= STANDARD_NUMBER.ONE_TICKET_PRICE;
  }

  subtractionAutoPurchaseBalance(autoPurchasePrice) {
    this.balance -= autoPurchasePrice;
  }
}
