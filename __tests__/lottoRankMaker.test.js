import LottoRankMaker from "../src/domain/lottoRankMaker.js";

describe("lottoRankMaker 테스트", () => {
  const testCases = [
    {
      lottoResult: [
        { normalNumber: 6, bonusNumber: 0 },
        { normalNumber: 5, bonusNumber: 1 },
        { normalNumber: 5, bonusNumber: 0 },
        { normalNumber: 4, bonusNumber: 0 },
        { normalNumber: 3, bonusNumber: 0 },
        { normalNumber: 2, bonusNumber: 0 },
        { normalNumber: 1, bonusNumber: 0 },
        { normalNumber: 0, bonusNumber: 0 },
      ],
      expectedResult: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    },
    {
      lottoResult: [
        { normalNumber: 6, bonusNumber: 0 },
        { normalNumber: 5, bonusNumber: 1 },
        { normalNumber: 5, bonusNumber: 0 },
        { normalNumber: 4, bonusNumber: 1 },
        { normalNumber: 0, bonusNumber: 0 },
      ],
      expectedResult: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 0 },
    },
  ];

  test.each(testCases)(
    "로또 결과가 '$lottoResult' 일 때, 등수별 로또 티켓 개수는 '$expectedResult' 이어야 한다.",
    ({ lottoResult, expectedResult }) => {
      const result = LottoRankMaker.calculateLottoRank(lottoResult);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});
