import LottoMachine from "../src/domain/LottoMachine.js";
import Lotto from "../src/domain/Lotto.js";
import Winnings from "../src/domain/Winnings.js";

describe("LottoMachine.test.js", () => {
  test("로또 배열을 저장함", () => {
    const money = 5000;

    const lottos = LottoMachine.createLottos(money);

    lottos.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
    });

    expect(lottos.length).toBe(5);
  });
});
