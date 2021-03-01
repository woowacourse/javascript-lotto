import { STANDARD_NUMBER } from "../Util/constants.js";

export default class Balance {
  constructor() {
    this.initialBalance = 0;
    this.balance = 0;
  }

  setBalance(money) {
    this.initialBalance = money;
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

// export default new Balance();
