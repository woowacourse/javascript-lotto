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

function checkThousandUnit(input) {
  if (input % 1000 !== 0) {
    throw new Error('[ERROR] 천원 단위로 떨어지지 않는 입력입니다.');
  }
}

const Validate = {
  checkIsEmpty,
  checkIsNumber,
  checkThousandUnit,
};

export default Validate;
