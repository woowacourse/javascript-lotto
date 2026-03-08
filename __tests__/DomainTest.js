import Lotto from "../src/Domain/Lotto.js";
import LottoMachine from "../src/Domain/LottoMachine.js";
import LottoResult from "../src/Domain/LottoResult.js";
import { MissionUtils } from "@woowacourse/mission-utils";

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

    test("toString()이 올바른 문자열을 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.toString()).toBe("[1, 2, 3, 4, 5, 6]");
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

const mockRandoms = (arrays) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  arrays.reduce((acc, arr) => {
    return acc.mockReturnValueOnce(arr);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

describe("LottoMachine 동작 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("issueLottos 테스트: 구매 금액/1000만큼 로또 구매 - 2장", () => {
    const machine = new LottoMachine();
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [40, 41, 42, 43, 44, 45],
    ]);
    const lottos = machine.issueLottos(2 * 1000);
    expect(lottos).toHaveLength(2);
    expect(lottos[0]).toBeInstanceOf(Lotto);
    expect(lottos[1]).toBeInstanceOf(Lotto);
  });
}
);

describe("LottoResult 동작 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  // 1. 등수 집계 테스트
  test("등수 집계 테스트: 각 등수 카운팅", () => {
    const luckyNumbers = {
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
    };

    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]), // 1등
      new Lotto([1, 2, 3, 4, 5, 7]), // 2등
      new Lotto([1, 2, 3, 4, 5, 8]), // 3등
      new Lotto([1, 2, 3, 4, 9, 10]), // 4등
      new Lotto([1, 2, 3, 11, 12, 13]), // 5등
      new Lotto([14, 15, 16, 17, 18, 19]), // 일치 없음
    ];

    const lottoResult = new LottoResult();

    const winningResult = lottoResult.calculateWinningResult(lottos,luckyNumbers);
    
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

     const lottoResult = new LottoResult();
     const winningResult = {
       FIRST: 1,
       SECOND: 1,
       THIRD: 1,
       FOURTH: 1,
       FIFTH: 1,
     };

     const purchasePrice = 6000;
     const profitRate = lottoResult.calculateProfitRate(winningResult,purchasePrice);

     expect(profitRate).toBe(
      ((5000 +
      50000 +
      1500000 +
      30000000 +
      2000000000) - purchasePrice) / purchasePrice * 100
     );
  });
});
