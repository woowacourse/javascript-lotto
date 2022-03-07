import { ERROR_MESSAGE } from '../constants/index.js';
import { validatePurchaseMoney } from '../view/validator.js';

describe('구입할 금액 입력 기능 테스트', () => {
  it('구입할 금액은 0을 입력할 수 없다.', () => {
    const purchaseMoney = 0;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.ZERO_PURCHASE_MONEY,
    );
  });

  it('구입할 금액은 숫자 타입만을 입력해야 한다.', () => {
    const purchaseMoney = 'abc';
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.INVALID_PURCHASE_MONEY_TYPE,
    );
  });

  it('구입할 금액은 천원 단위만 입력해야 한다.', () => {
    let purchaseMoney = 1250;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND,
    );

    purchaseMoney = 1000.5;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NOT_PURCHASE_MONEY_UNIT_OF_THOUSAND,
    );
  });

  it('구입할 금액은 양의 정수여야만 한다.', () => {
    const purchaseMoney = -1;
    expect(() => validatePurchaseMoney(purchaseMoney)).toThrow(
      ERROR_MESSAGE.NEGATIVE_PURCHASE_MONEY,
    );
  });

  it('구입할 금액을 정상적으로 입력시, 아무 문제가 발생하지 않는다.', () => {
    const purchaseMoney = 10000;
    expect(() => validatePurchaseMoney(purchaseMoney)).not.toThrow();
  });
});
