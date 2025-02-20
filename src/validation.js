import CONFIG from './constants/config.js';

function validationMoney(money) {
  if (money <= 0) {
    throw new Error();
  }
  if (money % 1000 !== 0) {
    throw new Error();
  }
}
function isValidLottoNumber(number) {
  return number >= CONFIG.MIN.LOTTO_NUMBER && number <= CONFIG.MAX.LOTTO_NUMBER;
}

function validLottoNumber(numbers) {
  if (!numbers.every(isValidLottoNumber)) {
    throw new Error('[ERROR] 로또 번호의 숫자 범위 1 ~ 45이다.');
  }
}

export { validationMoney, validLottoNumber };
