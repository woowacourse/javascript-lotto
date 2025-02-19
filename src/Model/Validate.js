function checkIsEmpty(input) {
  if (!input.trim()) {
    throw new Error('[ERROR] 공백 입력이 되었습니다.');
  }
}

function checkIsNumber(input) {
  if (Number.isNaN(Number(input))) {
    throw new Error('[ERROR] 숫자 이외의 입력입니다.');
  }
}

function checkThousandUnit(input) {
  if (input % 1000 !== 0) {
    throw new Error('[ERROR] 천원 단위로 입력해주세요.');
  }
}

function checkPriceRange(input) {
  if (input > 100000 || input < 1000) {
    throw new Error('[ERROR] 구입 금액 범위는 1,000 ~ 100,000원 입니다.');
  }
}

function checkLottoNumberRange(input) {
  if (input > 45 || input < 1) {
    throw new Error('[ERROR] 로또 숫자의 범위는 1 ~ 45 입니다.');
  }
}

function checkWinningNumberDuplicate(input) {
  const numbers = new Set(input);
  if (numbers.size !== 6) {
    throw new Error('[ERROR] 당첨 번호가 중복 입력되었습니다.');
  }
}

function checkBonusNumberDuplicate(winningNumber, bonusNumber) {
  if (winningNumber.includes(bonusNumber)) {
    throw new Error('[ERROR] 당첨 번호와 중복 입력입니다.');
  }
}

const Validate = {
  checkIsEmpty,
  checkIsNumber,
  checkThousandUnit,
  checkPriceRange,
  checkLottoNumberRange,
  checkWinningNumberDuplicate,
  checkBonusNumberDuplicate,
};

export default Validate;
