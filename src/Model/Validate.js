import { LOTTO_NUMBER_LENGTH, MAX_LOTTO_NUMBER, MAX_PRICE, MIN_LOTTO_NUMBER, MIN_PRICE } from '../constants/common.js';

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

function checkWinningNumberCount(input) {
  if (input.length !== LOTTO_NUMBER_LENGTH) {
    throw new Error(`[ERROR] ${LOTTO_NUMBER_LENGTH}개의 숫자를 입력해주세요.`);
  }
}

function checkThousandUnit(input) {
  if (input % MIN_PRICE !== 0) {
    throw new Error('[ERROR] 천원 단위로 입력해주세요.');
  }
}

function checkPriceRange(input) {
  if (input > MAX_PRICE || input < MIN_PRICE) {
    throw new Error('[ERROR] 구입 금액 범위는 1,000 ~ 100,000원 입니다.');
  }
}

function checkLottoNumberRange(input) {
  if (input > MAX_LOTTO_NUMBER || input < MIN_LOTTO_NUMBER) {
    throw new Error('[ERROR] 로또 숫자의 범위는 1 ~ 45 입니다.');
  }
}

function checkWinningNumberDuplicate(input) {
  const numbers = new Set(input);
  if (numbers.size !== LOTTO_NUMBER_LENGTH) {
    throw new Error('[ERROR] 당첨 번호가 중복 입력되었습니다.');
  }
}

function checkBonusNumberDuplicate(winningNumber, bonusNumber) {
  if (winningNumber.includes(bonusNumber)) {
    throw new Error('[ERROR] 당첨 번호와 중복 입력입니다.');
  }
}

function checkRestartChar(restart) {
  if (!['y', 'n', 'Y', 'N'].includes(restart)) {
    throw new Error('[ERROR] y 또는 n을 입력해주세요.');
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
  checkWinningNumberCount,
  checkRestartChar,
};

export default Validate;
