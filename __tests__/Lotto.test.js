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
    {
      numbers: [1, 7, 8, 9, 10, 11],
      expectedInfo: { matchedCount: 1, hasBonusNumber: true },
    },
    {
      numbers: [1, 2, 8, 9, 10, 11],
      expectedInfo: { matchedCount: 2, hasBonusNumber: false },
    },
    {
      numbers: [1, 2, 3, 9, 10, 11],
      expectedInfo: { matchedCount: 3, hasBonusNumber: false },
    },
    {
      numbers: [1, 2, 3, 4, 10, 11],
      expectedInfo: { matchedCount: 4, hasBonusNumber: false },
    },
    {
      numbers: [1, 2, 3, 4, 5, 11],
      expectedInfo: { matchedCount: 5, hasBonusNumber: false },
    },
    {
      numbers: [1, 2, 3, 4, 5, 6],
      expectedInfo: { matchedCount: 6, hasBonusNumber: false },
    },
    {
      numbers: [1, 2, 3, 4, 5, 7],
      expectedInfo: { matchedCount: 5, hasBonusNumber: true },
    },
  ];

  test.each(LOTTOS)(
    "구매한 로또 번호와 당첨 번호의 일치 갯수와 보너스 번호의 일치 여부를 판단한다.",
    ({ numbers, expectedInfo }) => {
      // given
      const ANSWER = [1, 2, 3, 4, 5, 6];
      const BONUS_NUMBER = 7;
      const lotto = new Lotto(numbers);

      // when
      const matchedNumber = lotto.getMatchedInfo(ANSWER, BONUS_NUMBER);

      // then
      expect(matchedNumber).toEqual(expectedInfo);
    }
  );
});
