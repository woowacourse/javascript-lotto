import PurchaseAmount from "./PurchaseAmount/PurchaseAmount.js";
import PurchaseOption from "./PurchaseOption/PurchaseOption.js";
import TicketBundle from "./Model/TicketBundle.js";

class App {
  constructor() {
    this.purchaseAmount = new PurchaseAmount();
    this.purchaseOption = new PurchaseOption();
    this.ticketBundle = new TicketBundle();
  }
}

export default App;
