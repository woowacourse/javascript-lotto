const { ERROR_MESSAGE } = require('../src/constant');
const Money = require('../src/domain/model/Money');

const expectThrowError = (amount, errorMessage) => {
  expect(() => {
    new Money(amount);
  }).toThrow(errorMessage);
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
  test.each([[10000.5], [5000.55], ['라잇'], ['난 숫자 아님']])(
    '구매 금액이 정수가 아닐 경우 에러를 발생시킨다',
    (amount) => {
      expectThrowError(amount, ERROR_MESSAGE.number);
    }
  );

  test.each([[10006], [1500]])(
    '구매 금액이 천원 단위가 아닐 경우 에러를 발생시킨다',
    (amount) => {
      expectThrowError(amount, ERROR_MESSAGE.moneyUnit);
    }
  );

  test.each([[101000], [-1000], [0], [1000000]])(
    '구매 금액이 천원 미만 십만원 초과일 경우 에러를 발생시킨다',
    (amount) => {
      expectThrowError(amount, ERROR_MESSAGE.moneyRange);
    }
  );
});
