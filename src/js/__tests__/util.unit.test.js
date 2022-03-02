import {
  isDividedByThousand,
  isEmptyValue,
  isPositiveValue,
} from '../utils/validator.js';

describe('구매 금액 유효성 검사 유틸 테스트', () => {
  test('금액이 천 단위인지 판단 할 수 있어야한다.', () => {
    const purchaseMoney = 3000;

    expect(isDividedByThousand(purchaseMoney)).toBe(true);
  });

  test('금액이 빈값인지 판단 할 수 있어야한다. ', () => {
    const purchaseMoney = '';

    expect(isEmptyValue(purchaseMoney)).toBe(true);
  });

  test('금액이 양의 정수인지 판단 할 수 있어야한다', () => {
    let purchaseMoney = -1000;

    expect(isPositiveValue(purchaseMoney)).toBe(false);

    purchaseMoney = 0;

    expect(isPositiveValue(purchaseMoney)).toBe(false);
  });
});
