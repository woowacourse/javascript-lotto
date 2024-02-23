import MoneyValidator from '../src/domain/MoneyValidator';

describe('구입 금액 기능 테스트', () => {
  test('구입 금액이 숫자가 아니라면 에러를 발생시킨다.', () => {
    const money = '쿠키';

    expect(() => MoneyValidator.validateType(money)).toThrow('[ERROR]');
  });

  test.each([0, 1000000001])('구입금액이 0 이하 1000000000 초과라면 에러를 발생시킨다', (money) => {
    expect(() => MoneyValidator.validateRange(money)).toThrow('[ERROR]');
  });

  test.each([1001, 1010, 1100])('구입금액이 1000원 단위가 아니라면 에러를 발생시킨다.', (money) => {
    expect(() => MoneyValidator.validateUnit(money)).toThrow('[ERROR]');
  });
});
