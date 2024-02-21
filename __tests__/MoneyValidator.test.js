import MoneyValidator from '../src/domain/MoneyValidator';

describe('구입 금액 기능 테스트', () => {
  test('구입 금액이 숫자가 아니라면 에러를 발생시킨다.', () => {
    const money = '쿠키';

    expect(() => MoneyValidator.validateMoneyType(money)).toThrow('[ERROR]');
  });

  test('구입금액이 0 이하이면 에러를 발생시킨다', () => {
    const money = 0;

    expect(() => MoneyValidator.validateMoneyMinimum(money)).toThrow('[ERROR]');
  });
});
