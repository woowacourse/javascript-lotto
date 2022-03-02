export const prizeNumberValidator = {
  isAllFilled(numbers) {
    return numbers.every((number) => !Number.isNaN(number));
  },

  isDuplicated(numbers) {
    return numbers.length !== new Set(numbers).size;
  },
};

export const validatePrizeNumber = (numbers) => {
  if (!prizeNumberValidator.isAllFilled(numbers)) {
    throw new Error('모든 당첨 번호를 입력해야합니다.');
  }

  if (prizeNumberValidator.isDuplicated(numbers)) {
    throw new Error('중복되는 번호가 존재합니다.');
  }
};
