import TicketBundle from "./Model/TicketBundle.js";
import PurchaseAmount from "./Container/PurchaseAmount.js";
import PurchaseOption from "./Container/PurchaseOption.js";
import Receipt from "./Container/Receipt.js";
import WinningNumber from "./Container/WinNumber.js";
import Result from "./Model/Result.js";
import Modal from "./Container/Modal.js";

class App {
  constructor() {
    this.ticketBundle = new TicketBundle();
    this.result = new Result();
    this.purchaseAmount = new PurchaseAmount();
    this.purchaseOption = new PurchaseOption();
    this.receipt = new Receipt();
    this.winningNumber = new WinningNumber();
    this.modal = new Modal();
  }
}

export default App;
