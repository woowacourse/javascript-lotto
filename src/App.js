import { InputView } from "./view/input.js";
import { OutputView } from "./view/output.js";
import { calculateLottoCount } from "./service/calculateLottoCount.js";
import { getLottos } from "./service/getRandomLotto.js";

class App {
  async run() {
    const money = await InputView.inputPurchaseAmount();
    const count = calculateLottoCount(money);
    const randomLotto = getLottos(count);
    OutputView.outputLottoNumber(randomLotto);
    const winningNumber = await InputView.inputWinningNumber();
    const bonusNumber = await InputView.inputBonusNumber();
    const retry = await InputView.inputRetry();
  }
}

export default App;
