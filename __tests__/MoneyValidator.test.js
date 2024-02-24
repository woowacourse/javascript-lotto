import Money from '../src/domain/validator/Money';

describe('구입 금액 기능 테스트', () => {
  test('구입 금액이 숫자가 아니라면 에러를 발생시킨다.', () => {
    const money = '쿠키';

    expect(() => Money.validateMoneyType(money)).toThrow('[ERROR]');
  });

  test('구입금액이 0 이하이면 에러를 발생시킨다', () => {
    const money = 0;

    expect(() => Money.validateMoneyMinimum(money)).toThrow('[ERROR]');
  });

  test('구입금액이 1000원 단위가 아니라면 에러를 발생시킨다.', () => {
    const money = 1001;

    expect(() => Money.validateMoneyUnit(money)).toThrow('[ERROR]');
  });
});
