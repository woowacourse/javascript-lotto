const InputValidator = {
  checkNaturalNumber(input) {
    const regExp = /^[0-9]$/g;
    if (!input.match(regExp)) {
      throw new Error('입력값이 자연수가 아닙니다.');
    }
  },
};

export default InputValidator;
