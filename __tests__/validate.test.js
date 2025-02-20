import ERROR_MESSAGE from "../src/constant/error.js";
import LOTTO from "../src/constant/lotto.js";
import { validateBonusNumber, validateRestart, validateWinningNumbers } from "../src/util/validate.js";

describe('validate', () => {
  describe('restart', () => {
    describe('예외 케이스', () => {
      test.each([['우디'],['k'],['에리얼'], ['오거스'],[1], ['']])('y or n이 아니면 에러가 발생한다.', (input) => {
        expect(() => validateRestart(input)).toThrow();
      })
    })
  })

  describe('BonusNumber', () => {
    describe('예외 케이스', () => {
      test(`숫자가 아닌 값인 경우`, () => {
        const numbers = [1,2,3,4,5,6];
        const number = '에리얼';
  
        expect(() => validateBonusNumber(number, numbers).toThrow(ERROR_MESSAGE.NOT_A_NUMBER));
      });

      test(`${LOTTO.MIN_RANDOM_VALUE}~${LOTTO.MAX_RANDOM_VALUE} 사이의 숫자가 아닌 경우`, () => {
        const numbers = [1,2,3,4,5,6];
        const number = '46';
  
        expect(() => validateBonusNumber(number, numbers)).toThrow(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
      });
      
      test(`중복된 번호가 있는 경우`, () => {
        const numbers = [1,2,3,4,5,6];
        const number = '6';
  
        expect(() => validateBonusNumber(number, numbers)).toThrow(ERROR_MESSAGE.DUPLICATE_NUMBER);
      });
    })
  })

  describe('Lotto ', () => {
      describe('예외 케이스', () => {
        test(`당첨 번호의 길이는 ${LOTTO.LENGTH}이다`, () => {
  
          const numbers = '1,2,3,4,5';
    
          expect(() => validateWinningNumbers(numbers)).toThrow(ERROR_MESSAGE.LOTTO_LENGTH);
        });
  
        test(`중복되는 번호가 있는 경우`, () => {
  
          const numbers = '1,2,3,4,5,5';
    
          expect(() => validateWinningNumbers(numbers)).toThrow(ERROR_MESSAGE.DUPLICATE_NUMBER);
        });
  
        test(`1~45 사이의 숫자가 아닌 값이 포함되어 있는 경우`, () => {
  
          const numbers = '1,2,3,4,5,66';
    
          expect(() => validateWinningNumbers(numbers)).toThrow(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
        });
  
        test(`숫자가 아닌 값이 포함되어 있는 경우`, () => {
  
          const numbers = '1,a,3,4,5,6';
    
          expect(() => validateWinningNumbers(numbers)).toThrow(ERROR_MESSAGE.NOT_A_NUMBER);
        });
      })
    })
})

