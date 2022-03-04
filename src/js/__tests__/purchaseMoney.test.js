import { ERROR_MESSAGE } from '../constants/index.js';
import { validatePurchaseMoney } from '../view/validator.js';

describe('구입할 금액 입력 기능 테스트', () => {
  it('구입할 금액으로 0을 입력할 수 없다.', () => {
    const purchaseMoney = 0;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.ZERO_PURCHASE_MONEY,
    );
  });

  it('구입할 금액으로 공백을 입력하면 안된다.', () => {
    const purchaseMoney = '';
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.INVALID_PURCHASE_MONEY_TYPE,
    );
  });

  it('구입할 금액으로 숫자 타입을 입력해야 한다.', () => {
    const purchaseMoney = 'abc';
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.INVALID_PURCHASE_MONEY_TYPE,
    );
  });

  it('구입할 금액으로 천원 단위만 입력해야 한다.', () => {
    const purchaseMoney = 1250;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND,
    );
  });

  it('구입할 금액으로 소수점은 입력할 수 없다.', () => {
    const purchaseMoney = 1000.5;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND,
    );
  });

  it('구입할 금액으로 최소 금액은 천원이상 이여야 한다.', () => {
    const purchaseMoney = 900;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND,
    );
  });

  it('구입할 금액으로 양의 정수여야 한다.', () => {
    const purchaseMoney = -1;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NEGATIVE_PURCHASE_MONEY,
    );
  });
});
