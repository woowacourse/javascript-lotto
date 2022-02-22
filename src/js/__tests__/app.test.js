import LottoManager from '../model/lottoManager.js';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

describe('구입 금액 검증 테스트 ', () => {
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => LottoManager.validateCashInput(cashInput)).toThrow();
  });
  test('입력 값이 1000원 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => LottoManager.validateCashInput(cashInput)).toThrow();
  });
  test('입력 값의 범위가 1000 - 50000인지 검증한다.', () => {
    const cashInput = '55000';
    expect(() => LottoManager.validateCashInput(cashInput)).toThrow();
  });
});
