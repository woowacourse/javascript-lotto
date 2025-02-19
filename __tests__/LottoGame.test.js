import Lotto from "../src/domain/Lotto.js";
import LottoGame from "../src/domain/LottoGame.js";
import Validator from "../src/Validator.js";
import { makeOneLottoArray } from "../src/utils/utils.js";

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
    const lotto = makeOneLottoArray();
    const lottoSet = new Set(lotto);
    const sameNumber = 6 - lottoSet.size;

    expect(sameNumber).toBe(0);
  });

  test("발행한 로또의 모든숫자는 오름차순이다", () => {
    const lotto = makeOneLottoArray();

    expect(() => {
      Validator.isUphillList(lotto);
    }).not.toThrow();
  });

  test("발행한 로또의 결과를 계산할 수 있다.", () => {
    const lottoGame = new LottoGame(1);
    const targetNumber = [1, 2, 3, 9, 10, 11];
    const bonusNumber = 12;
    lottoGame.lottoes = [new Lotto([1, 2, 3, 4, 5, 6])];
    lottoGame.calculate(targetNumber, bonusNumber);
    expect(lottoGame.result).toEqual({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    });
  });

  test("로또의 최종 상금을 계산할 수 있다.", () => {
    const lottoGame = new LottoGame(1);
    const targetNumber = [1, 2, 3, 9, 10, 11];
    const bonusNumber = 12;
    lottoGame.lottoes = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 9, 20, 21]),
    ];
    lottoGame.calculate(targetNumber, bonusNumber);

    expect(lottoGame.getWinMoney()).toBe(55000);
  });

  test("로또의 수익률을 구할 수 있다.", () => {
    const amount = 8;
    const lottoGame = new LottoGame(amount);
    const result = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    };

    lottoGame.result = result;

    expect(lottoGame.getEarningRate(amount)).toBe(62.5);
  });
});
