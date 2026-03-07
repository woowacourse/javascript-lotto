import { LOTTO_LENGTH, LOTTO_MIN_NUM, LOTTO_MAX_NUM } from './Lotto.js';
import { LOTTO_PRIZE } from './LottoMachine.js';


const Validator = {
  validatePurchaseAmount(value) {
    if (!Number.isInteger(Number(value))) {
      throw new Error('숫자만 입력해 주세요.');
    }
    if (Number(value) % LOTTO_PRIZE !== 0) {
      throw new Error('1000원 단위만 입력 가능합니다.');
    }
  },

  validateLottoNumber(LottoNumber) {
    if (LottoNumber.length !== LOTTO_LENGTH) {
      throw new Error('당첨 로또 번호는 숫자 6개여야 합니다.');
    }
    if (new Set(LottoNumber).size !== LottoNumber.length) {
      throw new Error('중복되는 당첨 번호는 사용할 수 없습니다.');
    }
    LottoNumber.forEach(number => {
      number = Number(number);
      if (!Number.isInteger(number)) {
        throw new Error('당첨 번호는 숫자만 입력 가능합니다.');
      }
      if (number > LOTTO_MAX_NUM || number < LOTTO_MIN_NUM) {
        throw new Error('당첨 번호는 1 ~ 45 이내 숫자만 입력 가능합니다.');
      }
    });
  },

  validateBonusNumber(winningLottoNumber, bonusNumber) {
    const num = Number(bonusNumber);
    if (!Number.isInteger(num)) {
      throw new Error('보너스 번호는 숫자만 입력 가능합니다.');
    }
    if (num > LOTTO_MAX_NUM || num < LOTTO_MIN_NUM) {
      throw new Error('보너스 번호는 1 ~ 45 이내 숫자만 입력 가능합니다.');
    }
    if (new Set([...winningLottoNumber, bonusNumber]).size !== LOTTO_LENGTH + 1) {
      throw new Error('보너스 번호는 당첨번호와 중복될 수 없습니다.');
    }
  },

  validateRetry(value) {
    if (!['y', 'n'].includes(value)) {
      throw new Error('다시시작 입력은 y 또는 n 만 입력 가능합니다.');
    }
  },
}

export default Validator;
