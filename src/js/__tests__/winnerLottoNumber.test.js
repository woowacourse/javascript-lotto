import { ERROR_MESSAGE, LOTTO_NUMBER_RANGE } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

function validateWinnerNumbers(winnerNumbers) {
  if (!isNumberArray(winnerNumbers)) {
    throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_WINNER_NUMBER_INPUTS);
  }
  if (!isNumberArrayInRange(winnerNumbers)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_NUMBERS_RANGE);
  }
  if (!isAllNumbersUnique(winnerNumbers)) {
    throw new Error(ERROR_MESSAGE.NOT_UNIQUE_NUMBERS);
  }
}

function isNumberArray(numberArray) {
  return !!numberArray.length && numberArray.every((number) => !!number);
}

function isNumberArrayInRange(numberArray) {
  return numberArray.every((number) =>
    isNumberInRange({ number, min: LOTTO_NUMBER_RANGE.MIN, max: LOTTO_NUMBER_RANGE.MAX })
  );
}

function isAllNumbersUnique(numberArray) {
  return numberArray.length === new Set(numberArray).size;
}

const convertStringNumberArrayToNumberArray = (stringNumberArray) =>
  stringNumberArray.map((string) => Number(string.trim()));

describe('당첨 번호와 보너스 번호 검증 테스트', () => {
  test('모든 입력 값이 숫자인지 검증한다.', () => {
    const winnerNumberInputs = ['1', '2', '3', '4', '5', '6', '  '];
    expect(() =>
      validateWinnerNumbers(convertStringNumberArrayToNumberArray(winnerNumberInputs))
    ).toThrow(ERROR_MESSAGE.NOT_A_NUMBER_WINNER_NUMBER_INPUTS);
  });
  test('모든 입력 값이 1 ~ 45 사이인지 검증한다.', () => {
    const winnerNumberInputs = ['1', '2', '3', '4', '5', '6', '100'];
    expect(() =>
      validateWinnerNumbers(convertStringNumberArrayToNumberArray(winnerNumberInputs))
    ).toThrow(ERROR_MESSAGE.OUT_OF_NUMBERS_RANGE);
  });
  test('모든 입력 값이 서로 다른지 검증한다.', () => {
    const winnerNumberInputs = ['1', '2', '3', '4', '5', '6', '6'];
    expect(() =>
      validateWinnerNumbers(convertStringNumberArrayToNumberArray(winnerNumberInputs))
    ).toThrow(ERROR_MESSAGE.NOT_UNIQUE_NUMBERS);
  });
});
