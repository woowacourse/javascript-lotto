import Lotto from '../src/domain/Lotto';

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
  ])('생성할 때 인자로 받은 로또 배열을 정렬한다.', (numbers, expected) => {
    const lotto = new Lotto(numbers);
    expect(lotto.getNumbers()).toEqual(expected);
  });
  test.each([1, 2, 3, 4, 34, 44, 45])('유효한 로또 숫자이면 true를 반환한다.', (number) => {
    expect(Lotto.isValidLottoNumber(number)).toBeTruthy();
  });

  test.each([-1, 0, 46, 47])('유효한 로또 숫자가 아니면 false를 반환한다.', (number) => {
    expect(Lotto.isValidLottoNumber(number)).toBeFalsy();
  });

  test.each([
    [[2, 1, 2, 3, 4, 5]],
    [[1, 1, 2, 3, 4, 5, 6]],
    [[5, 6, 7, 8, 44, 44]],
    [[1, 44, 45, 42, 43, 44]],
    [[1, 13, 8, 16, 4, 12, 15, 16]],
    [[10, 11, 12, 13, 14]],
  ])('로또 번호가 중복되었는지와 길이(갯수)가 유효한지 검사한다.', (numbers) => {
    expect(Lotto.isDuplicateNumbers(numbers)).toBeTruthy();
  });
  test('보너스 번호를 가지고 있으면 true를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusBall = 5;

    expect(lotto.hasBonus(bonusBall)).toBeTruthy();
  });

  test('보너스 번호를 가지고 있지 않으면 false를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusBall = 10;

    expect(lotto.hasBonus(bonusBall)).toBeFalsy();
  });

  test('로또 번호가 당첨 번호와 비교해 일치하는 갯수를 반환한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winLotto = new Lotto([4, 5, 6, 9, 10, 11]);

    expect(lotto.countMatch(winLotto)).toBe(3);
  });
});
