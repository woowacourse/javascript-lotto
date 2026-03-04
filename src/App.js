import { InputView } from "./view/input.js";
import { calculateLottoCount } from "./service/calculateLottoCount.js";

class App {
  async run() {
    const money = await InputView.inputPurchaseAmount();
    const count = calculateLottoCount(money);
  }
}

export default App;
