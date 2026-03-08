import { InputView } from "../view/input.js";
import { calculateLottoCount } from "../service/calculateLottoCount.js";
import { getLottos } from "../service/getRandomLotto.js";
import { OutputView } from "../view/output.js";
import MyLotto from "../domain/MyLotto.js";

export async function PurchaseLottoController() {
  const money = await InputView.inputPurchaseAmount();
  const count = calculateLottoCount(money);
  const randomLotto = getLottos(count);
  OutputView.outputLottoNumber(randomLotto);
  return new MyLotto(money, randomLotto);
}
