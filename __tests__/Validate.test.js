import {
  MIN_PRICE,
  MAX_PRICE,
  LOTTO_NUMBER_LENGTH,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
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

  describe('validateWinningNumbers() - 당첨 번호 입력 검증', () => {
    test.each(['', '   '])('공백 입력 예외처리', (winningNumbersInput) => {
      expect(() => {
        Validate.validateWinningNumbers(winningNumbersInput);
      }).toThrow('[ERROR] 공백 입력이 되었습니다.');
    });

    test.each(['1,2,3,4,5', '1,2,3,4,5,6,7'])(
      '당첨 번호 6개 미만/초과 입력 예외처리',
      (winningNumbersInput) => {
        expect(() => {
          Validate.validateWinningNumbers(winningNumbersInput);
        }).toThrow(`[ERROR] ${LOTTO_NUMBER_LENGTH}개의 숫자를 입력해주세요.`);
      }
    );


    test('쉼표만 입력된 경우 예외처리', () => {
      const winningNumbersInput = ',,,,,'; // 공백 값만 포함
      expect(() => {
        Validate.validateWinningNumbers(winningNumbersInput);
      }).toThrow('[ERROR] 공백 입력이 되었습니다.');
    });

    test.each(['1,2,3,4,5,0', '1,2,3,4,5,46'])(
      '1~45 범위 미만, 초과 값 예외처리',
      (winningNumbersInput) => {
        expect(() => {
          Validate.validateWinningNumbers(winningNumbersInput);
        }).toThrow();
      }
    );

    test('중복된 당첨 번호 입력 예외처리', () => {
      const duplicatedWinningNumbers = '1,2,3,4,5,5';
      expect(() => {
        Validate.validateWinningNumbers(duplicatedWinningNumbers);
      }).toThrow('[ERROR] 당첨 번호가 중복 입력되었습니다.');
    });
  });

  describe('validateBonusNumber() - 보너스 번호 검증', () => {
    test.each(['', '   '])('공백 입력 예외처리', (bonusNumber) => {
      expect(() => {
        Validate.validateBonusNumber(bonusNumber, '1,2,3,4,5,6');
      }).toThrow('[ERROR] 공백 입력이 되었습니다.');
    });

    test.each(['a', '!', '3a'])('숫자가 아닌 입력 예외처리', (bonusNumber) => {
      expect(() => {
        Validate.validateBonusNumber(bonusNumber, '1,2,3,4,5,6');
      }).toThrow('[ERROR] 숫자 이외의 입력입니다.');
    });

    test.each([`${MIN_LOTTO_NUMBER - 1}`, `${MAX_LOTTO_NUMBER + 1}`])(
      '1 ~ 45 범위 초과 값 예외처리',
      (bonusNumber) => {
        expect(() => {
          Validate.validateBonusNumber(bonusNumber, '1,2,3,4,5,6');
        }).toThrow('[ERROR] 로또 숫자의 범위는 1 ~ 45 입니다.');
      }
    );

    test('보너스 번호가 당첨 번호와 중복 입력된 경우 예외처리', () => {
      const bonusNumber = '6';
      const winningNumbers = '1,2,3,4,5,6';
      expect(() => {
        Validate.validateBonusNumber(bonusNumber, winningNumbers);
      }).toThrow('[ERROR] 당첨 번호와 중복 입력입니다.');
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
