import numberValidator from './numberValidator';

const winningNumbersValidator = {
  validate(winningNumbers) {
    this.validateDuplicate(winningNumbers);
  },

  validateDuplicate(winningNumbers) {
    if (winningNumbers.length !== new Set(winningNumbers).size) {
      throw new Error('[ERROR] 당첨 번호는 서로 중복될 수 없습니다.');
    }
  },

  validateRange(winningNumbers) {
    for (let i = 0; i < winningNumbers.length; i++) {
      numberValidator.validate(winningNumbers[i]);
      numberValidator.validateRange(winningNumbers[i]);
    }
  },
};

export default winningNumbersValidator;
