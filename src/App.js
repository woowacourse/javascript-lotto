import { InputView } from "./view/input.js";
import { calculateLottoCount } from "./service/calculateLottoCount.js";
import { getRandomLotto } from "./service/getRandomLotto.js";

class App {
  async run() {
    const money = await InputView.inputPurchaseAmount();
    const count = calculateLottoCount(money);
    const randomLotto = getRandomLotto(count);
    console.log(randomLotto);
  }
}

export default App;
