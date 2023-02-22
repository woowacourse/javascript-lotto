import REGEXP from '../constant/regexp.js';
import ERROR from '../constant/error.js';
import COMMAND from '../constant/command.js';

const Validator = (function () {
  return {
    isNumericString(value) {
      if (!REGEXP.NUMERIC.test(value)) {
        throw new Error(`${ERROR.HEAD} 올바른 숫자를 입력해주세요.`);
      }
    },

    canDivide(target, divider) {
      if (target % divider !== 0) {
        throw new Error(`${ERROR.HEAD} 1000 단위의 숫자를 입력해주세요.`);
      }
    },

    isValidLuckyNumbersFormat(string) {
      if (!REGEXP.NUMBER_COMMA_SPACE.test(string)) {
        throw new Error(`${ERROR.HEAD} 1,2,3,4,5,6 과 같이 입력해주새요.`);
      }
    },

    isValidRangeNumbers(numbers, { min, max }) {
      if (!numbers.every(number => number >= min && number <= max)) {
        throw new Error(`${ERROR.HEAD} 1과 45사이의 숫자를 입력해주세요.`);
      }
    },

    isValidRangeNumber(value, { min, max }) {
      if (value < min || value > max) {
        throw new Error(`${ERROR.HEAD} 1과 45사이의 숫자를 입력해주세요.`);
      }
    },

    isValidSize(numbers, size) {
      if (numbers.length !== size) {
        throw new Error(`${ERROR.HEAD} 6개의 숫자를 입력해주세요.`);
      }
    },

    isNonDuplicatedArray(numbers) {
      const numbersSet = new Set(numbers);

      if (numbers.length !== numbersSet.size) {
        throw new Error(`${ERROR.HEAD} 중복된 숫자는 입력할 수 없습니다.`);
      }
    },

    isNotExistInArray(targetNumbers, number) {
      if (targetNumbers.includes(number)) {
        throw new Error(
          `${ERROR.HEAD} 당첨 번호와 중복된 숫자는 입력할 수 없습니다.`
        );
      }
    },

    isValidRetryCommand(retryCommand) {
      if (retryCommand !== COMMAND.RETRY && retryCommand !== COMMAND.STOP) {
        throw new Error(`${ERROR.HEAD} y 혹은 n을 입력해주세요.`);
      }
    },
  };
})();

export default Validator;
