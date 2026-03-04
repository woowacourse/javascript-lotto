import { InputView } from "./view/input.js";
import { calculateLottoCount } from "./service/calculateLottoCount.js";
import { getLottos } from "./service/getRandomLotto.js";

class App {
  async run() {
    const money = await InputView.inputPurchaseAmount();
    const count = calculateLottoCount(money);
    const randomLotto = getLottos(count);
  }
}

export default App;
