import {
  MIN_PRICE,
  MAX_PRICE,
  LOTTO_NUMBER_LENGTH,
} from '../src/constants/common.js';
import Validate from '../src/Model/Validate.js';

describe('Validate 유효성 검사 테스트', () => {
  describe('validatePrice() - 구입 금액 입력 검증', () => {
    test.each(['', '   '])('공백 입력 예외처리', (price) => {
      expect(() => {
        Validate.validatePrice(price);
      }).toThrow('[ERROR] 공백 입력이 되었습니다.');
    });

    test.each(['abc', '천원'])('숫자가 아닌 입력 예외처리', (price) => {
      expect(() => {
        Validate.validatePrice(price);
      }).toThrow('[ERROR] 숫자 이외의 입력입니다.');
    });

    test.each([`${MIN_PRICE + 1}`, `${MIN_PRICE - 1}`])('천원 단위가 아닌 입력 예외처리', (price) => {
      expect(() => {
        Validate.validatePrice(price);
      }).toThrow('[ERROR] 천원 단위로 입력해주세요.');
    });

    test('구입 금액 범위(1,000 ~ 100,000원) 초과 예외처리', () => {
      expect(() => {
        const price = `${MAX_PRICE + 1000}`;
        Validate.validatePrice(price);
      }).toThrow('[ERROR] 구입 금액 범위는 1,000 ~ 100,000원 입니다.');
    });
  });

  describe('checkIsEmpty() - 공백 입력 검증', () => {
    test.each(['', '   '])('공백 입력 예외처리', (input) => {
      expect(() => {
        Validate.checkIsEmpty(input);
      }).toThrow('[ERROR] 공백 입력이 되었습니다.');
    });

    test('공백이 아닌 정상 입력 (예외 발생하지 않음)', () => {
      expect(() => {
        Validate.checkIsEmpty('123');
      }).not.toThrow();
    });
  });

  describe('checkIsNumber() - 숫자 입력 검증', () => {
    test.each(['abc', '천원'])('숫자가 아닌 입력 예외처리', (input) => {
      expect(() => {
        Validate.checkIsNumber(input);
      }).toThrow('[ERROR] 숫자 이외의 입력입니다.');
    });

    test.each(['123', '1000', '45'])('숫자 입력 (예외 발생하지 않음)', (input) => {
      expect(() => {
        Validate.checkIsNumber(input);
      }).not.toThrow();
    });
  });

  describe('checkWinningNumberCount() - 당첨 번호 개수 검증', () => {
    test('당첨 번호가 부족할 때 예외처리', () => {
      expect(() => {
        Validate.checkWinningNumberCount([1, 2, 3, 4, 5]);
      }).toThrow(`[ERROR] ${LOTTO_NUMBER_LENGTH}개의 숫자를 입력해주세요.`);
    });

    test('당첨 번호가 초과할 때 예외처리', () => {
      expect(() => {
        Validate.checkWinningNumberCount([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow(`[ERROR] ${LOTTO_NUMBER_LENGTH}개의 숫자를 입력해주세요.`);
    });

    test('당첨 번호가 정확히 6개일 때 정상 처리', () => {
      expect(() => {
        Validate.checkWinningNumberCount([1, 2, 3, 4, 5, 6]);
      }).not.toThrow();
    });
  });

  describe('checkLottoNumberRange() - 로또 번호 범위 검증', () => {
    test.each([0, 46, -1, 100])('범위를 벗어난 숫자 예외처리', (input) => {
      expect(() => {
        Validate.checkLottoNumberRange(input);
      }).toThrow('[ERROR] 로또 숫자의 범위는 1 ~ 45 입니다.');
    });

    test.each([1, 10, 45])('1~45 범위 내 숫자는 정상 처리', (input) => {
      expect(() => {
        Validate.checkLottoNumberRange(input);
      }).not.toThrow();
    });
  });

  describe('checkWinningNumberDuplicate() - 당첨 번호 중복 검증', () => {
    test('중복된 번호가 있을 때 예외처리', () => {
      expect(() => {
        Validate.checkWinningNumberDuplicate([1, 2, 3, 4, 5, 5]);
      }).toThrow('[ERROR] 당첨 번호가 중복 입력되었습니다.');
    });

    test('중복 없이 6개 숫자 입력 시 정상 처리', () => {
      expect(() => {
        Validate.checkWinningNumberDuplicate([1, 2, 3, 4, 5, 6]);
      }).not.toThrow();
    });
  });

  describe('checkBonusNumberDuplicate() - 보너스 번호 중복 검증', () => {
    test('보너스 번호가 당첨 번호와 중복될 때 예외처리', () => {
      expect(() => {
        Validate.checkBonusNumberDuplicate([1, 2, 3, 4, 5, 6], 5);
      }).toThrow('[ERROR] 당첨 번호와 중복 입력입니다.');
    });

    test('보너스 번호가 당첨 번호와 다를 때 정상 처리', () => {
      expect(() => {
        Validate.checkBonusNumberDuplicate([1, 2, 3, 4, 5, 6], 7);
      }).not.toThrow();
    });
  });

  describe('checkRestartChar() - 재시작 문자 검증', () => {
    test.each(['x', 'z', '1', '', '재시작'])(
      '잘못된 재시작 문자 예외처리',
      (restartInput) => {
        expect(() => {
          Validate.checkRestartChar(restartInput);
        }).toThrow('[ERROR] y 또는 n을 입력해주세요.');
      }
    );

    test.each(['y', 'Y', 'n', 'N'])(
      '올바른 입력 (예외 발생하지 않음)',
      (restartInput) => {
        expect(() => {
          Validate.checkRestartChar(restartInput);
        }).not.toThrow();
      }
    );
  });
});
