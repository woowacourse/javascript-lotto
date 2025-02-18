function checkIsEmpty(input) {
  if (!input.trim()) {
    throw new Error('[ERROR] 공백 입력이 되었습니다.');
  }
}

const Validate = {
  checkIsEmpty,
};

export default Validate;
