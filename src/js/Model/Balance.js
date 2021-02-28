class Balance {
  constructor() {
    this.balance = 0;
  }

  setBalance(money) {
    this.balance = money;

    return this.balance;
  }

  subtractionSelfPurchaseBalance() {
    this.balance -= 1000;
  }

  subtractionAutoPurchaseBalance(autoPurchasePrice) {
    this.balance -= autoPurchasePrice;
  }
}

export default new Balance();
