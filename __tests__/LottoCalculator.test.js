import LottoCalculator from "../src/domain/LottoCalculator.js";

describe("LottoCalculator 클래스 테스트", () => {
  const MATCH_STATES = [
    "FIVE",
    "SIX",
    "FOUR",
    "ONE",
    "FIVE_AND_BONUS",
    "THREE",
  ];
  const lottoCalculator = new LottoCalculator(MATCH_STATES);

  test("matchStates에 해당하는 순위 객체를 반환한다.", () => {
    const EXPECTED = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 };

    expect(lottoCalculator.calculateRank()).toEqual(EXPECTED);
  });

  test("로또 게임 결과 수익률을 반환한다.", () => {
    const USER_RANKS = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 };
    const EXPECTED_PROFIT_RATE = "33859250.0";
    console.log(lottoCalculator.calculateProfitRate(USER_RANKS));

    expect(lottoCalculator.calculateProfitRate(USER_RANKS)).toBe(
      EXPECTED_PROFIT_RATE
    );
  });
});
