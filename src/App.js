import { LOTTO_PRICE, OUTPUT_MESSAGES } from "./lib/constants.js";
import InputView from "./views/InputView.js";

class App {
  constructor() {}

  async run() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const purchaseCount = purchaseAmount / LOTTO_PRICE;

    console.log(OUTPUT_MESSAGES.purchaseCount(purchaseCount));
  }
}

export default App;
