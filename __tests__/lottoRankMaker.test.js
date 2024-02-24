import lottoRankMaker from "../src/domain/lottoRankMaker.js";

describe("lottoRankMaker 테스트", () => {
  const testCases = [
    {
      lottoResult: [
        { normalResult: 6, bonusResult: 0 },
        { normalResult: 5, bonusResult: 1 },
        { normalResult: 5, bonusResult: 0 },
        { normalResult: 4, bonusResult: 0 },
        { normalResult: 3, bonusResult: 0 },
        { normalResult: 2, bonusResult: 0 },
        { normalResult: 1, bonusResult: 0 },
        { normalResult: 0, bonusResult: 0 },
      ],
      expectedResult: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    },
    {
      lottoResult: [
        { normalResult: 6, bonusResult: 0 },
        { normalResult: 5, bonusResult: 1 },
        { normalResult: 5, bonusResult: 0 },
        { normalResult: 4, bonusResult: 1 },
        { normalResult: 0, bonusResult: 0 },
      ],
      expectedResult: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 0 },
    },
  ];

  test.each(testCases)(
    "로또 결과가 '$lottoResult' 일 때, 등수별 로또 티켓 개수는 '$expectedResult' 이어야 한다.",
    ({ lottoResult, expectedResult }) => {
      const result = lottoRankMaker.calculateLottoRank(lottoResult);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});
