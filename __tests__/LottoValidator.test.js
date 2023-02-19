import LottoValidator from '../src/model/LottoValidator';
import MESSAGE from '../src/constants/messages';

describe('유효성 검사 테스트', () => {
  describe('로또 구입 금액 유효성 테스트', () => {
    test.each([[['a'], [' '], ['']]])('입력값 정수가 아니라면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateMoneyInput(input);
      }).toThrow(MESSAGE.ERROR.POSITIVE_INTEGER);
    });

    test.each([[['2300'], ['1200']]])('1000원 단위의 금액이 아니라면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateMoneyInput(input);
      }).toThrow(MESSAGE.ERROR.THOUSANDS_WON);
    });
  });

  describe('당첨번호 유효성 테스트', () => {
    test.each([['1,a,2,3,4,5'], ['0,1,2,3,4,45'], ['1,2,3,4,5,46']])(
      '입력값이 1부터 45사이가 아니거나 정수가 아니라면 예외처리한다.',
      input => {
        expect(() => {
          LottoValidator.validateWinningNumberInput(input);
        }).toThrow(MESSAGE.ERROR.VALID_SIX_NUMBER);
      },
    );

    test.each([['1, 2, 3, 4, 5, 6']])('입력에 공백이 있다면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateWinningNumberInput(input);
      }).toThrow(MESSAGE.ERROR.HAS_BLANK);
    });

    test.each([['1,2,3,4,5,6,7'], ['1,2,3,4,5']])('입력한 숫자가 6개가 아니면 예외처리한다', input => {
      expect(() => {
        LottoValidator.validateWinningNumberInput(input);
      }).toThrow(MESSAGE.ERROR.NOT_SIX_LENGTH);
    });

    test.each([['1,2,3,3,4,5']])('입력한 숫자에 중복이 있다면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateWinningNumberInput(input);
      }).toThrow(MESSAGE.ERROR.OVERLAP);
    });
  });

  describe('보너스 번호 유효성 테스트', () => {
    test.each([['a'], ['']])('입력값이 정수가 아니라면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateBonusNumberInput([1, 2, 3, 4, 5, 6], input);
      }).toThrow(MESSAGE.ERROR.POSITIVE_INTEGER);
    });

    test.each([['46']])('입력값이 1에서 45사이가 아니라면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateBonusNumberInput([1, 2, 3, 4, 5, 6], input);
      }).toThrow(MESSAGE.ERROR.IN_RANGE);
    });

    test.each([[1]])('당첨번호와 보너스번호가 중복된다면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateBonusNumberInput('1,2,3,4,5,6', input);
      }).toThrow(MESSAGE.ERROR.OVERLAP_WINNING_NUM);
    });
  });

  describe('재시작 여부 유효성 검사 테스트', () => {
    test.each([['Y'], ['a'], ['1']])('y 또는 n이 아니면 예외처리한다.', input => {
      expect(() => {
        LottoValidator.validateRestart(input);
      }).toThrow(MESSAGE.ERROR.Y_OR_N);
    });
  });
});
