import PurchaseAmount from "./PurchaseAmount/PurchaseAmount.js";
import PurchaseOption from "./PurchaseOption/PurchaseOption.js";

class App {
  constructor() {
    this.purchaseAmount = new PurchaseAmount();
    this.purchaseOption = new PurchaseOption();
  }
}

export default App;
