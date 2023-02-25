import Lotto from '../src/domain/model/Lotto';

describe('Lotto 클래스 입니다.', () => {
  test.each([
    [
      [6, 5, 4, 3, 2, 1],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [7, 6, 5, 3, 2, 1],
      [1, 2, 3, 5, 6, 7],
    ],
  ])('로또 생성시 번호를 오름차순으로 정렬한다.', (numbers, expected) => {
    const lotto = new Lotto(numbers);
    expect(lotto.getNumbers()).toEqual(expected);
  });

  test('보너스 번호를 가지고 있으면 true를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusBall = 5;

    expect(lotto.hasBonus(bonusBall)).toBe(true);
  });

  test('보너스 번호를 가지고 있지 않으면 false를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusBall = 10;

    expect(lotto.hasBonus(bonusBall)).toBe(false);
  });

  test('로또 번호가 당첨 번호와 비교해 일치하는 갯수를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winLotto = new Lotto([4, 5, 6, 9, 10, 11]);

    expect(lotto.countMatch(winLotto)).toBe(3);
  });
});
