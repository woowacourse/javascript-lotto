const restartValidator = {
  validate(restartInput) {
    const restart = restartInput.toLowerCase();
    if (!this.isValidInput(restart)) {
      throw new Error('[ERROR] y 또는 n을 입력해주세요.');
    }
  },

  isValidInput(restart) {
    return restart === 'y' || restart === 'n';
  },
};

export default restartValidator;
