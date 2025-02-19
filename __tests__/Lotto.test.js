import Lotto from '../src/Lotto.js';
import LOTTO from '../src/constant/lotto.js';
import ERROR_MESSAGE from '../src/constant/error.js';

describe('Lotto class', () => {
  describe('예외 처리', () => {
    describe('예외 케이스', () => {
      test(`당첨 번호의 길이는 ${LOTTO.LENGTH}이다`, () => {

        const numbers = '1,2,3,4,5';
  
        expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.LOTTO_LENGTH);
      });

      test(`중복되는 번호가 있는 경우`, () => {

        const numbers = '1,2,3,4,5,5';
  
        expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.DUPLICATE_NUMBER);
      });

      test(`1~45 사이의 숫자가 아닌 값이 포함되어 있는 경우`, () => {

        const numbers = '1,2,3,4,5,66';
  
        expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
      });

      test(`숫자가 아닌 값이 포함되어 있는 경우`, () => {

        const numbers = '1,a,3,4,5,6';
  
        expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.NOT_A_NUMBER);
      });
    })
  })
})