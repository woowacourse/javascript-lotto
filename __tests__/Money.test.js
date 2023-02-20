const Money = require('../src/domain/model/Money');

const expectThrowError = (amount) => {
  expect(() => {
    new Money(amount);
  }).toThrow('[ERROR]');
};

describe('Money class 기능 테스트', () => {
  test('구매 금액을 반환한다.', () => {
    const AMOUNT = 10000;
    const money = new Money(AMOUNT);

    const result = money.getAmount();
    expect(result).toBe(AMOUNT);
  });
});

describe('Money class 유효성 테스트', () => {
  test.each([[10000.5], [-1000], [0], ['라잇']])(
    '구매 금액이 양수인 정수가 아닐 경우 에러를 발생시킨다',
    (amount) => {
      expectThrowError(amount);
    }
  );

  test.each([[10006], [1500]])(
    '구매 금액이 천원 단위가 아닐 경우 에러를 발생시킨다',
    (amount) => {
      expectThrowError(amount);
    }
  );

  test.each([[101000], [1000000]])(
    '구매 금액이 십만원을 넘을 경우 에러를 발생시킨다',
    (amount) => {
      expectThrowError(amount);
    }
  );
});
