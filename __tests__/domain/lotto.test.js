import Lotto from '../../src/domain/model/Lotto';

describe('lotto 테스트', () => {
  test('Lotto의 숫자가 6개가 아닐 때, 에러를 발생시킨다.', () => {
    const inputNumber = [1, 2, 3, 4];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('Lotto의 숫자에 중복이 발생할 때, 에러를 발생시킨다.', () => {
    const inputNumber = [1, 2, 3, 4, 10, 10];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('Lotto의 입력값에 문자열이 들어온다면, 에러를 발생시킨다.', () => {
    const inputNumber = [1, 2, 3, 'e', 5, 6];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });
  test('Lotto의 숫자 범위가 1부터 45가 아니라면, 에러를 발생시킨다.', () => {
    const inputNumber = [1, 2, 3, 4, 5, 100];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });

  test('Lotto의 입력값에 공백이 들어온다면, 에러를 발생시킨다.', () => {
    const inputNumber = [1, 2, 3, ' ', 5, 6];

    expect(() => {
      new Lotto(inputNumber);
    }).toThrow();
  });
});
