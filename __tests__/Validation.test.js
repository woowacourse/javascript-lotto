import {
  RandomNumberStaticValue,
  GameControlStaticValue,
  ErrorMessage,
} from '../src/constants/Constants.js';
import Validation from '../src/utils/Validation.js';

describe('Validation 테스트', () => {
  describe('구입 금액 입력값 예외 테스트', () => {
    test('값이 0 이하인 경우 예외 발생', () => {
      const PURCHASE_AMOUNT = [0, -1000, -2000, -1561];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.testPurchaseAmount(amount)).toThrow(ErrorMessage.MINMUM_VALUE);
      });
    });

    test('값이 천원 단위가 아닌 경우 예외 발생', () => {
      const PURCHASE_AMOUNT = [100, 2200, 3330, 4444];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.testPurchaseAmount(amount)).toThrow(ErrorMessage.MONEY_VALUE);
      });
    });

    test('값이 숫자가 아닌 문자를 포함하는 경우 예외 발생', () => {
      const PURCHASE_AMOUNT = ['A1', '2B', ' ', '', 'ABC', '1 2 3'];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.checkMoneyInputType(amount)).toThrow(ErrorMessage.MONEY_INPUT_TYPE);
      });
    });

    test('값이 최대값 이상일 때 예외 발생', () => {
      const PURCHASE_AMOUNT = 110000;

      expect(() => Validation.testPurchaseAmount(PURCHASE_AMOUNT)).toThrow(
        ErrorMessage.MONEY_LIMIT,
      );
    });
  });

  describe('당첨 번호 입력값 예외 테스트', () => {
    test('숫자가 아닌 문자를 입력한 경우 예외 발생', () => {
      const INPUTS = ['1,2,3,4,1A,5', '5,6,7,A1,8,9', '1,,2,4,5,6', '1, ,2,3,4,5'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.testLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_VALUE);
      });
    });

    test(`로또 번호 갯수가 ${RandomNumberStaticValue.LENGTH}개가 아닐 때 에러가 발생한다.`, () => {
      const INPUTS = ['1,2,3,4,5', '5,6,7', '1', '1,4,5', '1,2,3,4,5,6,7,8,9,10'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.testLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_LENGTH);
      });
    });

    test(`로또 번호들이 ${RandomNumberStaticValue.LOWER_INCLUSIVE}~${RandomNumberStaticValue.UPPER_INCLUSIVE} 사이의 숫자가 아니면 에러가 발생한다.`, () => {
      const INPUTS = ['1,2,3,4,5,90', '100,101,102,103,104,105'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.testLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_VALUE);
      });
    });

    test('로또 번호가 중복되면 에러가 발생한다.', () => {
      const INPUTS = ['1,2,3,4,5,5', '33,33,33,1,2,3'];

      INPUTS.forEach((input) => {
        const NUMBERS = input.split(',').map(Number);

        expect(() => Validation.testLottoNumbers(NUMBERS)).toThrow(ErrorMessage.LOTTO_DUPLICATE);
      });
    });
  });

  describe('보너스 번호 테스트', () => {
    test('보너스 번호가 로또 번호와 중복되면 에러가 발생한다.', () => {
      const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
      const BONUS_NUMBER = [1, 4, 6];

      BONUS_NUMBER.forEach((bonusNumber) => {
        expect(() => Validation.testBonusNumber(WINNING_NUMBERS, bonusNumber)).toThrow();
      });
    });

    test(`보너스 번호가 ${RandomNumberStaticValue.LOWER_INCLUSIVE}~${RandomNumberStaticValue.UPPER_INCLUSIVE} 사이의 숫자가 아니면 에러가 발생한다.`, () => {
      const BONUS_NUMBER = [100, 0, -11, 'A1', 'E', '9fd', '', ' '];

      BONUS_NUMBER.forEach((bonusNumber) => {
        expect(() => {
          Validation.testBonusNumber(bonusNumber);
        }).toThrow(ErrorMessage.BONUS_NUMBER_VALUE);
      });
    });
  });

  describe('게임 재시작 여부 테스트', () => {
    test(`${GameControlStaticValue.RESTART_BUTTON}, ${GameControlStaticValue.QUIT_BUTTON}이 아닌 문자(대문자 제외)를 입력한 경우 에러가 발생한다.`, () => {
      const REPLIES = ['d', 5, 'wer', ''];

      REPLIES.forEach((reply) => {
        expect(() => {
          Validation.testRestart(reply);
        }).toThrow(ErrorMessage.RESTART);
      });
    });
  });
});
