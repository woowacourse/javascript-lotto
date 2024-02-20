import LottoValidator from '../src/domains/LottoValidator';

describe('LottoValidator 기능 테스트', () => {
  test('로또 번호의 범위는 1~45까지다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 46];

    expect(() => LottoValidator.validate(NUMBERS)).toThrow();
  });

  test('로또 번호는 총 6개이어야 한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 6, 7];

    expect(() => LottoValidator.validate(NUMBERS)).toThrow();
  });

  test('로또 번호는 중복되지 않아야 한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 5];

    expect(() => LottoValidator.validate(NUMBERS)).toThrow();
  });

  test('로또 번호는 정수로 이루어져야 한다.', () => {
    const NUMBERS = [1, 2, 3, 4, 5, 1.1];

    expect(() => LottoValidator.validate(NUMBERS)).toThrow();
  });
});
