import { STANDARD_NUMBER } from "../Util/constants.js";

class Balance {
  constructor() {
    this.balance = 0;
  }

  setBalance(money) {
    this.balance = money;

    return this.balance;
  }

  subtractionSelfPurchaseBalance() {
    this.balance -= STANDARD_NUMBER.ONE_TICKET_PRICE;
  }

  subtractionAutoPurchaseBalance(autoPurchasePrice) {
    this.balance -= autoPurchasePrice;
  }
}

export default new Balance();
