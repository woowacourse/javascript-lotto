import Lotto from "../src/Domain/Lotto";

describe("로또 클래스 테스트", () => {
  test.each([
    {
      numbers: [1, 2, 3, 4, 5, 6],
      winObj: { winNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7 },
      rankExpected: 1,
    },
    {
      numbers: [1, 2, 3, 4, 5, 6],
      winObj: { winNumbers: [1, 2, 3, 4, 5, 7], bonusNumber: 6 },
      rankExpected: 2,
    },
    {
      numbers: [1, 2, 3, 4, 5, 45],
      winObj: { winNumbers: [1, 2, 3, 4, 5, 7], bonusNumber: 6 },
      rankExpected: 3,
    },
    {
      numbers: [11, 23, 33, 41, 44, 45],
      winObj: { winNumbers: [11, 23, 41, 42, 43, 44], bonusNumber: 6 },
      rankExpected: 4,
    },
    {
      numbers: [1, 2, 3, 7, 8, 9],
      winObj: { winNumbers: [1, 2, 3, 10, 15, 22], bonusNumber: 45 },
      rankExpected: 5,
    },
  ])(
    "로또 당첨번호를 입력받아서 $rankExpected 등수를 계산한다",
    ({ numbers, winObj, rankExpected }) => {
      const lotto = new Lotto(numbers);

      lotto.calculateRank(winObj);
      expect(lotto.getRank()).toBe(rankExpected);
    }
  );
});
