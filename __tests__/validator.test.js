import bonusNumberValidator from '../src/validators/bonusNumberValidator';
import numberValidator from '../src/validators/numberValidator';
import purchaseAmountValidator from '../src/validators/purchaseAmountValidator';
import restartValidator from '../src/validators/restartValidator';
import winningNumbersValidator from '../src/validators/winningNumbersValidator';

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

  describe('당첨 번호 테스트', () => {
    test('당첨 번호가 중복되는 경우 예외를 발생시킨다.', () => {
      const winningNumbers = [1, 2, 3, 4, 6, 6];

      const mockFn = () => {
        winningNumbersValidator.validateDuplicate(winningNumbers);
      };

      expect(mockFn).toThrow('[ERROR]');
    });

    test('당첨 번호가 1부터 45 사이가 아닌 경우 예외를 발생시킨다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 46];

      const mockFn = () => {
        winningNumbersValidator.validateRange(winningNumbers);
      };

      expect(mockFn).toThrow('[ERROR]');
    });

    test('당첨 번호가 6개가 아닌 경우 예외를 발생시킨다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5];

      const mockFn = () => {
        winningNumbersValidator.validateLength(winningNumbers.length);
      };

      expect(mockFn).toThrow('[ERROR]');
    });
  });

  describe('보너스 번호 테스트', () => {
    test('보너스 번호가 당첨 번호와 중복되는 경우 예외를 발생시킨다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 6;

      const mockFn = () => {
        bonusNumberValidator.validateDuplicate(bonusNumber, winningNumbers);
      };

      expect(mockFn).toThrow('[ERROR]');
    });
  });

  describe('재시작 입력 테스트', () => {
    test('재시작 입력이 y 또는 n이 아닌 경우 예외를 발생시킨다.', () => {
      const restartInput = 'yes';

      const mockFn = () => {
        restartValidator.validate(restartInput);
      };

      expect(mockFn).toThrow('[ERROR]');
    });
  });
});
