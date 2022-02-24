import Lotto from '../models/Lotto/Lotto.js';
import { LOTTO, ERROR_MESSAGE, PAYMENT } from '../configs/contants.js';

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function isDividedByThousand(value) {
  return value % LOTTO.PRICE === 0;
}

function isValidChargeAmountRange(chargeAmount) {
  return (
    chargeAmount >= PAYMENT.AMOUNT_RANGE.MIN &&
    chargeAmount <= PAYMENT.AMOUNT_RANGE.MAX
  );
}

export function isValidLottoNumberRange(value) {
  return value >= LOTTO.NUMBER_RANGE.MIN && value <= LOTTO.NUMBER_RANGE.MAX;
}

export function isValidlottoNumbers(lottoNumbers) {
  return (
    lottoNumbers.length === LOTTO.NUMBER_LENGTH &&
    lottoNumbers.every(
      (lottoNumber) =>
        isValidLottoNumberRange(lottoNumber) && Number.isInteger(lottoNumber)
    )
  );
}

export function isValidLotto(lotto) {
  return isValidlottoNumbers(lotto.getNumbers());
}

export function isValidLottoList(lottoList, count) {
  return (
    lottoList.length === count &&
    lottoList.every((lotto) => lotto instanceof Lotto)
  );
}

export const validator = {
  checkChargeAmount: (chargeAmount) => {
    if (!isNumber(chargeAmount)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    }

    if (!isDividedByThousand(chargeAmount)) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
    }

    if (!isValidChargeAmountRange(chargeAmount)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE);
    }
  },
};
