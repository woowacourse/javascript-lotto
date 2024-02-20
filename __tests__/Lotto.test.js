import Lotto from "../src/step1/domains/Lotto";

describe("로또 도메인 테스트", () => {
  // given
  const INVALID_LOTTO_INPUT = [
    [["harry"]],
    [[1, 2, 3, 4, 5, 6, 7]],
    [[1, 2, 3, 4, 5, 46]],
    [[1, 1, 2, 3, 4, 5]],
  ];

  test.each(INVALID_LOTTO_INPUT)(
    "유효하지 않은 번호로 로또를 생성할 경우 예외를 발생시킨다",
    (numbers) => {
      expect(() => {
        // when, then
        new Lotto(numbers);
      }).toThrow(Error);
    }
  );

  const LOTTOS = [
    { numbers: [1, 7, 8, 9, 10, 11], expectedCount: 1 },
    { numbers: [1, 2, 8, 9, 10, 11], expectedCount: 2 },
    { numbers: [1, 2, 3, 9, 10, 11], expectedCount: 3 },
    { numbers: [1, 2, 3, 4, 10, 11], expectedCount: 4 },
    { numbers: [1, 2, 3, 4, 5, 11], expectedCount: 5 },
    { numbers: [1, 2, 3, 4, 5, 6], expectedCount: 6 },
  ];

  test.each(LOTTOS)(
    "사용자가 구매한 로또 번호와 당첨 번호를 비교한다.",
    ({ numbers, expectedCount }) => {
      // given
      const ANSWER = [1, 2, 3, 4, 5, 6];
      const lotto = new Lotto(numbers);

      // when
      const matchedNumber = lotto.countMatchedNumber(ANSWER);

      // then
      expect(matchedNumber).toBe(expectedCount);
    }
  );

  const BONUS_TEST_CASE = [
    { numbers: [1, 2, 3, 4, 5, 7], expectedResult: true },
    { numbers: [1, 2, 3, 4, 5, 6], expectedResult: false },
  ];

  test.each(BONUS_TEST_CASE)(
    "로또는 보너스 번호를 포함하는지 올바르게 판단한다.",
    ({ numbers, expectedResult }) => {
      //given
      const BONUS_NUMBER = 7;
      const lotto = new Lotto(numbers);

      //when
      const bonusResult = lotto.hasBonusNumber(BONUS_NUMBER);

      //then
      expect(bonusResult).toBe(expectedResult);
    }
  );
});
