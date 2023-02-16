import LottoCalculator from "../src/domain/LottoCalculator.js";

describe("LottoCalculator 클래스 테스트", () => {
  test("matchStates에 해당하는 순위 객체를 반환한다", () => {
    const MATCH_STATES = [
      "FIVE",
      "SIX",
      "SIX",
      "ONE",
      "FIVE_AND_BONUS",
      "FIVE",
    ];

    const EXPECTED = { 1: 2, 2: 1, 3: 2, 6: 1 };

    const lottoCalculator = new LottoCalculator(MATCH_STATES);

    expect(lottoCalculator.calculateRank()).toEqual(EXPECTED);
  });
});
