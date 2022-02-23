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
  const lottoManger = new LottoManager();
  test('입력 값이 빈 칸이 아니어야 한다.', () => {
    const cashInput = '';
    expect(() => lottoManger.buyLotto(cashInput)).toThrow();
  });
  test('입력 값이 1000원 단위인지 검증한다.', () => {
    const cashInput = '1500';
    expect(() => lottoManger.buyLotto(cashInput)).toThrow();
  });
  test('입력 값의 범위가 1000 - 50000인지 검증한다.', () => {
    const cashInput = '55000';
    expect(() => lottoManger.buyLotto(cashInput)).toThrow();
  });
  test('올바른 입력 값을 입력하면 오류가 발생하지 않는다.', () => {
    const cashInput = '2000';
    expect(() => lottoManger.buyLotto(cashInput)).not.toThrow();
  });
});
