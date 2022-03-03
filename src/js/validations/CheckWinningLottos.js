function hasDuplicatedNumbers(inputWinningNumbers) {
  const set = new Set(inputWinningNumbers);
  return set.size !== 7;
}

function areNumbersInRange(inputWinningNumbers, min, max) {
  return inputWinningNumbers.every((currentValue) => {
    return currentValue <= max && currentValue >= min;
  });
}

function isBlank(inputWinningNumbers) {
  return inputWinningNumbers.some((number) => Number.isNaN(number));
}

export default function validateInputWinningNumbers(inputWinningNumbers) {
  if (isBlank(inputWinningNumbers)) {
    throw new Error('입력되지 않은 값이 있습니다.');
  }
  if (!areNumbersInRange(inputWinningNumbers, 1, 45)) {
    throw new Error('1 ~ 45 사이의 숫자를 입력해주세요.');
  }
  if (hasDuplicatedNumbers(inputWinningNumbers)) {
    throw new Error('중복된 숫자가 있습니다.');
  }
}
