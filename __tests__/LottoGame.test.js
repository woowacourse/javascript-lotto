import Lotto from "../src/domain/Lotto.js";
import LottoGame from "../src/domain/LottoGame.js";
import Validator from "../src/Validator.js";
import { makeOneLotto } from "../src/utils/utils.js";

describe("LottoGame 객체 테스트", () => {
  test("LottoGame은 로또의 결과를 저장할 수 있다.", () => {
    const lottoGame = new LottoGame(5);
    expect(lottoGame.result).toEqual({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });
  });

  test("구매할 횟수를 입력하면 그만큼의 로또가 발행된다.", () => {
    const amount = 3;
    const lottoGame = new LottoGame(amount);
    expect(lottoGame.lottoes.length).toBe(3);
    expect(lottoGame.lottoes.every((lotto) => lotto instanceof Lotto)).toBe(
      true,
    );
  });

  test("발행한 로또의 모든숫자는 중복되지 않는다.", () => {
    const lotto = makeOneLotto();
    const lottoSet = new Set(lotto);
    const sameNumber = 6 - lottoSet.size;

    expect(sameNumber).toBe(0);
  });

  test("발행한 로또의 모든숫자는 오름차순이다", () => {
    const lotto = makeOneLotto();

    expect(() => {
      Validator.isUphillList(lotto);
    }).not.toThrow();
  });
});
