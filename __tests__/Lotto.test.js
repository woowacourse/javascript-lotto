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
  ])('로또 배열을 정렬한다.', (numbers, expected) => {
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

  test.each([Lotto.MIN_NUMBER - 1, Lotto.MAX_NUMBER + 1, 'string', null, undefined, {}])(
    `로또 번호가 ${Lotto.MIN_NUMBER}에서 ${Lotto.MAX_NUMBER} 사이의 정수가 아니면 false를 반환합니다.`,
    (number) => {
      expect(Lotto.isLottoNumber(number)).toBe(false);
    },
  );

  test.each([5, 7])(
    `구매할 로또 번호 갯수가 ${Lotto.SIZE}개가 아니면 false를 반환합니다.`,
    (size) => {
      expect(Lotto.isValidSize(size)).toBe(false);
    },
  );

  test('중복된 번호가 있으면 true를 반환합니다.', () => {
    const numbers = [4, 45, 4, 32, 1, 6];

    expect(Lotto.hasDuplicate(numbers)).toBe(true);
  });
});
