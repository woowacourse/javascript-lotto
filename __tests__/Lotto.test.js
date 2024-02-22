import Lotto from '../src/domain/Lotto';

describe('[Lotto] 당첨 번호 매칭 테스트', () => {
  test('각 로또는 주어진 당첨 번호 목록과 일치하는 번호 개수를 반환할 수 있다.', () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [4, 5, 6, 7, 8, 9];

    // when
    const matchedNumbersCount = lotto.countMatchedNumbers(winningNumbers);

    // then
    expect(matchedNumbersCount).toBe(3);
  });
});

describe('[Lotto] 보너스 번호 매칭 테스트', () => {
  test('각 로또는 주어진 보너스 번호의 포함 여부를 반환할 수 있다.', () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 6;

    // when
    const hasBonusNumber = lotto.hasNumber(bonusNumber);

    // then
    expect(hasBonusNumber).toBe(true);
  });
});
