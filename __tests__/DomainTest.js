import Lotto from "../src/Domain/Lotto.js";
import LottoMachine from "../src/Domain/LottoMachine.js";
import LottoResult from "../src/Domain/LottoResult.js";
import LuckyNumbers from "../src/Domain/LuckyNumbers.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  describe("기능 동작", () => {
    test("정상적으로 로또가 생성된다.", () => {
      expect(new Lotto([1, 2, 3, 4, 5, 6])).toBeInstanceOf(Lotto);
    });

    test("getFormattedNumbers()가 올바른 문자열을 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.getFormattedNumbers()).toBe("[1, 2, 3, 4, 5, 6]");
    });

    test("당첨 번호와 일치하는 개수를 계산한다.", () => {
      const lotto = new Lotto([1, 2, 3, 10, 20, 30]);
      const winningNumbers = [1, 2, 4, 5, 6, 7];
      expect(lotto.countMatches(winningNumbers)).toBe(2);
    });

    test("보너스 번호가 포함되어 있으면 true를 반환한다.", () => {
      expect(new Lotto([1, 2, 3, 10, 20, 30]).hasBonus(20)).toBe(true);
    });

    test("보너스 번호가 포함되어 있지 않으면 false를 반환한다.", () => {
      expect(new Lotto([1, 2, 3, 10, 20, 30]).hasBonus(45)).toBe(false);
    });
  });
});

describe("LottoMachine 동작 테스트", () => {
  test("모킹 없이 고정된 번호로 로또가 발행되는지 테스트", () => {
    const randomGenerator = () => [1, 2, 3, 4, 5, 6];

    const lottos = LottoMachine.issueLottos("1000", randomGenerator);

    expect(lottos[0].getFormattedNumbers()).toBe("[1, 2, 3, 4, 5, 6]");
  });
}
);

describe("LottoResult 동작 테스트", () => {

  // 1. 등수 집계 테스트
  test("등수 집계 테스트: 각 등수 카운팅", () => {
    const luckyNumbers = new LuckyNumbers([1, 2, 3, 4, 5, 6], "7");

    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]), // 1등
      new Lotto([1, 2, 3, 4, 5, 7]), // 2등
      new Lotto([1, 2, 3, 4, 5, 8]), // 3등
      new Lotto([1, 2, 3, 4, 9, 10]), // 4등
      new Lotto([1, 2, 3, 11, 12, 13]), // 5등
      new Lotto([14, 15, 16, 17, 18, 19]), // 일치 없음
    ];

    const winningResult = LottoResult.calculateWinningResult(
      lottos,
      luckyNumbers,
    );
    expect(winningResult).toEqual({
      FIFTH: 1,
      FIRST: 1,
      FOURTH: 1,
      SECOND: 1,
      THIRD: 1,
    });
  });

  // 2. 수익률 테스트
  test("수익률 테스트", () => {
     const winningResult = {
       FIRST: 1,
       SECOND: 1,
       THIRD: 1,
       FOURTH: 1,
       FIFTH: 1,
     };

     const purchasePrice = 6000;
     const profitRate = LottoResult.calculateProfitRate(winningResult,purchasePrice);

     const expectedTotalPrize = 5000 + 50000 + 1500000 + 30000000 + 2000000000;
     const expectedRate = Number((((expectedTotalPrize - purchasePrice) / purchasePrice) * 100).toFixed(1));

     expect(profitRate).toBe(expectedRate);
  });
});


