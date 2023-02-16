import { COMMAND, LOTTO } from "../constants/index.js";

const InputValidator = {
  checkNaturalNumber(input) {
    const regExp = /^[0-9]+$/g;
    if (!input.match(regExp)) {
      throw new Error('입력값이 자연수가 아닙니다.');
    }
  },
  checkFallApart(input, unit) {
    if (input % unit !== 0) {
      throw new Error(`입력 값이 ${unit}원 단위가 아닙니다.`);
    }
  },
  checkLottoNumber(number) {
    this.checkNaturalNumber(number);
    if (number < LOTTO.min || number > LOTTO.max) {
      throw new Error(`입력값이 ${LOTTO.min}~${LOTTO.max}범위의 숫자가 아닙니다.`);
    }
  },
  checkDuplicatedNumbers(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('중복된 숫자가 존재합니다.');
    }
  },
  checkReadRetryCommand(input) {
    if (!(input === COMMAND.restart || input === COMMAND.quit)) {
      throw new Error(`입력값이 ${COMMAND.restart} 혹은 ${COMMAND.quit}이어야 합니다.`);
    }
  },
  checkArrayLength(arr, length) {
    if (arr.length !== length) {
      throw new Error(`입력 값이 ${length}개 여야 하는데 ${arr.length}개만 입력되었습니다.`);
    }

  }
};

export default InputValidator;
