function checkIsEmpty(input) {
  if (!input.trim()) {
    throw new Error('[ERROR] 공백 입력이 되었습니다.');
  }
}

function checkIsNumber(input) {
  if (!Number.isNaN(input)) {
    throw new Error('[ERROR] 숫자 이외의 입력입니다.');
  }
}

const Validate = {
  checkIsEmpty,
  checkIsNumber,
};

export default Validate;
