const Lotto = require('../src/domain/Lotto');

describe('Lotto 클래스 테스트', () => {
  test('로또 번호 6개를 인자로 받아 로또를 생성한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('로또 번호와 당첨 번호의 일치 개수를 계산한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.calculateMatchCount([1, 2, 3, 4, 5, 6])).toBe(6);
  });

  test('보너스 번호가 로또 번호에 존재하는지 판단한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.isBonus(6)).toBe(true);
  });
});
