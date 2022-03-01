import Lotto from '../models/Lotto/Lotto.js';
import { LOTTO, ERROR_MESSAGE, PAYMENT } from '../configs/contants.js';

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

const isValidMinAmountRange = (purchaseAmount) => {
  return purchaseAmount >= PAYMENT.PURCHASE_AMOUNT.MIN;
};

const isValidMaxAmountRange = (purchaseAmount) => {
  return purchaseAmount <= PAYMENT.PURCHASE_AMOUNT.MAX;
};

export const isValidLottoNumberRange = (value) =>
  value >= LOTTO.NUMBER_RANGE.MIN && value <= LOTTO.NUMBER_RANGE.MAX;

export const isValidlottoNumbers = (lottoNumbers) =>
  lottoNumbers.length === LOTTO.NUMBER_LENGTH &&
  lottoNumbers.every(
    (lottoNumber) =>
      isValidLottoNumberRange(lottoNumber) && Number.isInteger(lottoNumber)
  );

export const isValidLotto = (lotto) => isValidlottoNumbers(lotto.numbers);

export const isValidLottoList = (lottoList, count) =>
  lottoList.length === count &&
  lottoList.every((lotto) => lotto instanceof Lotto);

export const isValidDuplicatedLottoNumber = (lotto) =>
  lotto.numbers.length === new Set(lotto.numbers).size;

export const validator = {
  checkPurchaseAmount: (purchaseAmount) => {
    if (!isNumber(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    }

    if (!isValidMinAmountRange(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_MIN_AMOUNT_RANGE);
    }

    if (!isValidMaxAmountRange(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_MAX_AMOUNT_RANGE);
    }
  },
};
