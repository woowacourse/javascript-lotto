import { InputView } from "../view/input.js";
import { calculateLottoCount } from "../service/calculateLottoCount.js";
import { getLottos } from "../service/getRandomLotto.js";
import { OutputView } from "../view/output.js";
import MyLotto from "../domain/MyLottos.js";

export async function PurchaseLottoController() {
  const money = await InputView.inputPurchaseAmount();
  const count = calculateLottoCount(money);
  const randomLottos = getLottos(count);
  OutputView.outputLottoNumber(randomLottos);
  return new MyLotto(money, randomLottos);
}
