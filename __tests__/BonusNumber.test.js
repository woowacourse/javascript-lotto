import BonusNumber from "../src/BonusNumber.js";
import LOTTO from "../src/constant/lotto.js";
import ERROR_MESSAGE from "../src/constant/error.js";

describe('BonusNumber class', () => {
  describe('예외 처리', () => {
    describe('예외 케이스', () => {
      test(`숫자가 아닌 값인 경우`, () => {
        const number = '에리얼';
  
        expect(() => new BonusNumber(number)).toThrow(ERROR_MESSAGE.NOT_A_NUMBER);
      });

      test(`${LOTTO.MIN_RANDOM_VALUE}~${LOTTO.MAX_RANDOM_VALUE} 사이의 숫자가 아닌 경우`, () => {
        const number = '46';
  
        expect(() => new BonusNumber(number)).toThrow(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
      });
      
      test(`중복된 번호가 있는 경우`, () => {
        const numbers = [1,2,3,4,5,6];
        const number = '6';
  
        expect(() => new BonusNumber(number, numbers)).toThrow(ERROR_MESSAGE.DUPLICATE_NUMBER);
      });
    })
  })
})