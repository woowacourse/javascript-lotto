const RestartResponseValidation = {
  validate(response = '') {
    if (response !== 'y' && response !== 'n') {
      throw new Error('[ERROR]유효한 응답이 아닙니다. y/n으로 응답해 주세요.');
    }
  },
};
export default RestartResponseValidation;
