import { InputView } from "../view/input.js";
import { OutputView } from "../view/output.js";
import MyLotto from "../domain/MyLottos.js";

export async function PurchaseLottoController() {
  const money = await InputView.inputPurchaseAmount();
  const myLotto = MyLotto.createMyLotto(money);
  OutputView.outputLottoNumber(myLotto.getRandomLotto());
  return myLotto;
}
