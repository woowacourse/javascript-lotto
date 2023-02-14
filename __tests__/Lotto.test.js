const Lotto = require('../src/domain/Lotto');

describe('Lotto 클래스 테스트', () => {
  test('로또에 1 ~ 45까지의 숫자가 아닌 숫자가 포함되면 예외 처리 한다. ', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 66]);
    }).toThrow();
  });

  test('로또의 모든 숫자가 1 ~ 45에 포함되면 로또를 생성한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
