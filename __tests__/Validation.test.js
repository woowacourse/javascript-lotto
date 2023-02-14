import Validation from '../src/utils/Validation';

describe('Validation 테스트', () => {
  test('구입 금액 입력 값이 천원 단위가 아닌 경우 예외 발생', () => {
    const PURCHASE_AMOUNT = [100, 2200, 3330, 4444];

    PURCHASE_AMOUNT.forEach((amount) => {
      expect(() => Validation.checkPurchaseAmount(amount)).toThrow();
    })
  });
})