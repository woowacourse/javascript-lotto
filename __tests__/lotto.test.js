const Lotto = require("../src/domain/Lotto");

describe("복권이 당첨번호, 보너스번호와 일치하는지 테스트", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test.each([
    [
      [[1, 2, 3, 7, 8, 9], 9],
      [[7, 8, 9, 10, 11, 12], 12],
      [[1, 2, 3, 4, 5, 6], 6],
    ],
  ])(
    "복권과 당첨번호(유저입력)의 합에서 중복값을 뺀 개수 반환 %#",
    (testCase) => {
      const result = lotto.matchNumbers(testCase[0]);
      expect(result).toEqual(testCase[1]);
    }
  );

  test.each([
    [
      [1, true],
      [7, false],
    ],
  ])("보너스번호가 복권에 있는지 여부에 따라 불린값 반환 %#", (testCase) => {
    const result = lotto.matchBonus(testCase[0]);
    expect(result).toEqual(testCase[1]);
  });
});
