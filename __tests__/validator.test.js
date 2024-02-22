import numberValidator from '../src/validators/numberValidator';
import purchaseAmountValidator from '../src/validators/purchaseAmountValidator';

describe('유효성 검사 테스트', () => {
  describe('구매 금액 테스트', () => {
    test('구매 금액이 1000원 단위가 아닌 경우 예외를 발생시킨다.', () => {
      const input = 7500;

      const mockFn = () => {
        purchaseAmountValidator.validateUnitAmount(input);
      };

      expect(mockFn).toThrow('[ERROR]');
    });

    test('구매 금액이 공백인 경우 예외를 발생시킨다.', () => {
      const input = '';

      const mockFn = () => {
        numberValidator.validateBlank(input);
      };

      expect(mockFn).toThrow('[ERROR]');
    });

    test('구매 금액이 숫자가 아닌 경우 예외를 발생시킨다.', () => {
      const input = 'fe';

      const mockFn = () => {
        numberValidator.validateNumber(input);
      };

      expect(mockFn).toThrow('[ERROR]');
    });
  });
});
