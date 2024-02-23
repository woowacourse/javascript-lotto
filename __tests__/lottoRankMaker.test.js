import LottoRankMaker from "../src/domain/lottoRankMaker.js";

describe("lottoRankMaker 테스트", () => {
  const testCases = [
    {
      lottoResult: [
        { normal: 6, bonus: 0 },
        { normal: 5, bonus: 1 },
        { normal: 5, bonus: 0 },
        { normal: 4, bonus: 0 },
        { normal: 3, bonus: 0 },
        { normal: 2, bonus: 0 },
        { normal: 1, bonus: 0 },
        { normal: 0, bonus: 0 },
      ],
      expectedResult: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    },
    {
      lottoResult: [
        { normal: 6, bonus: 0 },
        { normal: 5, bonus: 1 },
        { normal: 5, bonus: 0 },
        { normal: 4, bonus: 1 },
        { normal: 0, bonus: 0 },
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
