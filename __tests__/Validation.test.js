import { StaticValue, ErrorMessage } from '../src/constants/Constants.js';
import Validation from '../src/utils/Validation.js';

describe('Validation 테스트', () => {
  describe('구입 금액 입력값 예외 테스트', () => {
    test('값이 0 이하인 경우 예외 발생', () => {
      const PURCHASE_AMOUNT = [0, -1000, -1561];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.verifyPurchaseAmount(amount)).toThrow(ErrorMessage.MINIMUM_VALUE);
      });
    });

    test('값이 천원 단위가 아닌 경우 예외 발생', () => {
      const PURCHASE_AMOUNT = [100, 2200, 3330, 4444];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.verifyPurchaseAmount(amount)).toThrow(ErrorMessage.MONEY_VALUE);
      });
    });

    test('값이 숫자가 아닌 문자를 포함하는 경우 예외 발생', () => {
      const PURCHASE_AMOUNT = ['A1', '2B', ' ', '', 'ABC', '1 2 3'];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.checkMoneyInputType(amount)).toThrow(ErrorMessage.MONEY_INPUT_TYPE);
      });
    });
  });

  describe('당첨 번호 입력값 예외 테스트', () => {
    test('숫자가 아닌 문자를 입력한 경우 예외 발생', () => {
      const INPUTS = ['1,2,3,4,1A,5', '5,6,7,A1,8,9', '1,,2,4,5,6', '1, ,2,3,4,5'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.verifyLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_VALUE);
      });
    });

    test(`로또 번호 갯수가 ${StaticValue.LOTTO_LENGTH}개가 아닐 때 에러가 발생한다.`, () => {
      const INPUTS = ['1,4,5', '1,2,3,4,5,6,7,8,9,10'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.verifyLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_LENGTH);
      });
    });

    test(`로또 번호들이 ${StaticValue.LOTTO_LOWER_INCLUSIVE}~${StaticValue.LOTTO_UPPER_INCLUSIVE} 사이의 숫자가 아니면 에러가 발생한다.`, () => {
      const INPUTS = ['1,2,3,4,5,90', '1,2,-3,4,5,6'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.verifyLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_VALUE);
      });
    });

    test('로또 번호가 중복되면 에러가 발생한다.', () => {
      const INPUT = '1,2,3,4,5,5';
      const NUMBERS = INPUT.split(',').map(Number);

      expect(() => Validation.verifyLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_DUPLICATE);
    });
  });

  describe('보너스 번호 테스트', () => {
    test('보너스 번호가 로또 번호와 중복되면 에러가 발생한다.', () => {
      const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
      const BONUS_NUMBER = [1, 4, 6];

      BONUS_NUMBER.forEach((bonusNumber) => {
        expect(() => Validation.verifyBonusNumber(WINNING_NUMBERS, bonusNumber)).toThrow();
      });
    });

    test(`보너스 번호가 ${StaticValue.LOTTO_LOWER_INCLUSIVE}~${StaticValue.LOTTO_UPPER_INCLUSIVE} 사이의 숫자가 아니면 에러가 발생한다.`, () => {
      const BONUS_NUMBER = [100, 0, -11, 'A1', 'E', '9fd', '', ' '];

      BONUS_NUMBER.forEach((bonusNumber) => {
        expect(() => {
          Validation.verifyBonusNumber(bonusNumber);
        }).toThrow(ErrorMessage.BONUS_NUMBER_VALUE);
      });
    });
  });

  describe('게임 재시작 여부 테스트', () => {
    test(`${StaticValue.RESTART_CONTROL}, ${StaticValue.QUIT_CONTROL}이 아닌 문자(대문자 제외)를 입력한 경우 에러가 발생한다.`, () => {
      const REPLIES = ['d', 5, 'wer', '', ' '];

      REPLIES.forEach((reply) => {
        expect(() => {
          Validation.verifyRestart(reply);
        }).toThrow(ErrorMessage.RESTART);
      });
    });
  });
});
