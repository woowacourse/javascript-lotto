import Lotto from '../../src/domain/Lotto';

describe('lotto 테스트', () => {
  test('lotto가 6개가 아닐 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 4];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('lotto가 중복이 존재할 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 4, 10, 10];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('lotto가 숫자가 아닌 값이 존재할 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, NaN, 5, 6];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('lotto가 1~45 범위를 벗어날 때, 예외가 발생한다.', () => {
    const inputNumber = [1, 2, 3, 4, 5, 100];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });
});
