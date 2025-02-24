import Lotto from "../src/domain/Lotto";
import LottoManager from "../src/domain/LottoManager";

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  const price = 5000;
  const userLotto = LottoManager.generateLottos(price);
  console.log(userLotto);
  expect(userLotto.length).toBe(5);
});
