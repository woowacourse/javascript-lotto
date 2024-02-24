import Lotto from '../src/domain/entities/Lotto';

describe('로또 테스트', () => {
  test('오름차순으로 정렬된 로또 번호를 갖는다.', () => {
    const lotto = new Lotto([3, 4, 5, 10, 2, 1]);

    const RESULT_LOTTO = [1, 2, 3, 4, 5, 10];

    expect(lotto.numberList).toEqual(RESULT_LOTTO);
  });

  test('사용자가 구매한 로또 번호와 당첨 번호를 비교한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
    const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 7;

    const result = lotto.getMatchedAmount(WINNING_NUMBERS, BONUS_NUMBER);
    expect(result.matchedCount).toBe(5);
    expect(result.isBonusMatched).toBeTruthy();
  });
});
