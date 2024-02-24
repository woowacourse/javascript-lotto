import lottoResultMaker from "../src/domain/lottoResultMaker.js";

describe("lottoResultMaker 테스트", () => {
  const testCases = [
    {
      winningCombination: {
        normalNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
      issuedLottoArray: [
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7],
        [11, 12, 13, 14, 15, 16],
      ],
      expectedResult: [
        { normalResult: 6, bonusResult: 0 },
        { normalResult: 5, bonusResult: 1 },
        { normalResult: 0, bonusResult: 0 },
      ],
    },
    {
      winningCombination: {
        normalNumbers: [40, 41, 42, 43, 44, 45],
        bonusNumber: 39,
      },
      issuedLottoArray: [
        [1, 2, 3, 4, 5, 6],
        [40, 41, 42, 43, 44, 45],
        [1, 2, 3, 39, 40, 41],
      ],
      expectedResult: [
        { normalResult: 0, bonusResult: 0 },
        { normalResult: 6, bonusResult: 0 },
        { normalResult: 2, bonusResult: 1 },
      ],
    },
  ];

  test.each(testCases)(
    "로또 당첨 번호가 '$winningCombination' 이고 발행된 로또 번호가 '$issuedLottoArray' 일 때, lottoResult는 '$expectedResult' 이어야 한다.",
    ({ winningCombination, issuedLottoArray, expectedResult }) => {
      const result = lottoResultMaker.calculateLottoResult(issuedLottoArray, winningCombination);
      expect(result).toStrictEqual(expectedResult);
    }
  );
});
