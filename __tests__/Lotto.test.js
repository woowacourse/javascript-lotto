import Lotto from '../src/domain/Lotto';
describe('로또 기능 테스트', () => {
  test('로또 번호는 6개여야 한다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);
    expect(lotto.getNumbers().length).toBe(6);
  });

  test('로또 번호가 6개가 아니면 에러를 발생시킨다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    expect(() => {
      new Lotto(numbers);
    }).toThrow();
  });

  test('로또 번호가 중복되면 에러를 발생시킨다.', () => {
    const numbers = [1, 2, 3, 4, 5, 5];

    expect(() => {
      new Lotto(numbers);
    }).toThrow();
  });

  test('로또 번호가 숫자가 아니면 에러를 발생시킨다.', () => {
    const numbers = ['ㄱ', 2, 3, 4, 5, 6];

    expect(() => {
      new Lotto(numbers);
    }).toThrow();
  });
});
