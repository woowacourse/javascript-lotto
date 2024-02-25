import {
  PurchaseAmountValidator,
  WinningNumberValidator,
  BonusNumberValidator,
  RestartOrExitValidator,
} from '../src/validators';
import { ERROR } from '../src/constants';

describe('유효성 검사 테스트', () => {
  describe('구입 금액 테스트', () => {
    test.each(['ㄱ', '-', 11.5])(
      '구입 금액이 정수가 아닌 %s을 입력한 경우, 에러가 발생한다.',
      (input) => {
        expect(() => PurchaseAmountValidator.validateInteger(input)).toThrow(
          ERROR.INVALID_NUMBER_FORMAT,
        );
      },
    );

    test('구입 금액이 1,000원 단위가 아닌 경우, 에러가 발생한다.', () => {
      expect(() => PurchaseAmountValidator.validateUnit(1500)).toThrow(ERROR.INVALID_UNIT);
    });

    test('구입 금액이 1,000원 미만인 경우, 에러가 발생한다.', () => {
      expect(() => PurchaseAmountValidator.validateAboveMinRange(500)).toThrow(
        ERROR.MIN_PURCHASE_AMOUNT,
      );
    });
  });

  describe('당첨 번호 테스트', () => {
    test.each([[[1, 2, 3, 4, 5, 6, 7]], [[11, 15, 32]]])(
      '당첨 번호가 6개가 아닌 경우, 에러가 발생한다.',
      (input) => {
        expect(() => WinningNumberValidator.validateCount(input)).toThrow(ERROR.INVALID_LENGTH);
      },
    );

    test.each([[[1, 2, 3, 4, 5, '-']], [[11, 15, 32, 'ㄱ', 12, 1]]])(
      '당첨 번호가 정수가 아닌 %s을 입력한 경우, 에러가 발생한다.',
      (input) => {
        expect(() => WinningNumberValidator.validateInteger(input)).toThrow(
          ERROR.INVALID_NUMBER_FORMAT,
        );
      },
    );

    test('중복되는 당첨 번호가 존재할 경우, 에러가 발생한다.', () => {
      const numbers = [1, 6, 3, 4, 5, 6];

      expect(() => WinningNumberValidator.validateDuplicate(numbers)).toThrow(
        ERROR.DUPLICATE_NUMBER,
      );
    });

    test('당첨 번호가 1 ~ 45 범위에 속하지 않는 경우, 에러가 발생한다.', () => {
      const numbers = [46, 6, 3, 11, 5, 6];

      expect(() => WinningNumberValidator.validateWithinRange(numbers)).toThrow(ERROR.OUT_OF_RANGE);
    });
  });

  describe('보너스 번호 테스트', () => {
    test.each(['ㄱ', '-', 11.5])(
      '보너스 번호가 정수가 아닌 %s을 입력한 경우, 에러가 발생한다.',
      (input) => {
        expect(() => BonusNumberValidator.validateInteger(input)).toThrow(
          ERROR.INVALID_NUMBER_FORMAT,
        );
      },
    );

    test.each([0, 46, -1])(
      '보너스 번호가 1 ~ 45 범위에 속하지 않는 %s을 입력한 경우, 에러가 발생한다.',
      (input) => {
        expect(() => BonusNumberValidator.validateRange(input)).toThrow(
          ERROR.BONUS_NUMBER_IS_OUT_OF_RANGE,
        );
      },
    );

    test('보너스 번호가 당첨 번호와 중복되는 경우, 에러가 발생한다.', () => {
      const winningNumber = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 4;
      expect(() =>
        BonusNumberValidator.validateDuplicatedWinningNumber(bonusNumber, winningNumber),
      ).toThrow(ERROR.DUPLICATE_WINNING_NUMBER);
    });
  });

  describe('재시작/종료 테스트', () => {
    test.each(['Y', 'N', 6, , 'ㅇ'])(
      '재시작/종료 문구에 y 또는 n이 아닌 %s을 입력한 경우, 에러가 발생한다.',
      (input) => {
        expect(() => RestartOrExitValidator.validateKeyword(input)).toThrow(ERROR.RESTART_OR_EXIT);
      },
    );
  });
});
