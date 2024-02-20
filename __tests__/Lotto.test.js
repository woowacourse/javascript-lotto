import Lotto from "../src/Domain/Lotto";

describe("로또 클래스 테스트", () => {
  test.each([
    [
      {
        numbers: [1, 2, 3, 4, 5, 6],
        winObj: { winNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7 },
        rankExpected: 1,
      },
    ],
  ])(
    "로또 당첨번호를 입력받아서 등수를 계산한다",
    ({ numbers, winObj, rankExpected }) => {
      const lotto = new Lotto(numbers);

      lotto.calculateRank(winObj);
      expect(lotto.getRank()).toBe(rankExpected);
    }
  );
});
