import Lotto from '../models/Lotto/Lotto.js';
import { LOTTO, ERROR_MESSAGE, PAYMENT } from '../configs/contants.js';

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

const isDividedByThousand = (value) => value % LOTTO.PRICE === 0;

const isValidPurchaseAmountRange = (purchaseAmount) =>
  purchaseAmount >= PAYMENT.PURCHASE_AMOUNT.MIN &&
  purchaseAmount <= PAYMENT.PURCHASE_AMOUNT.MAX;

export const isValidLottoNumberRange = (value) =>
  value >= LOTTO.NUMBER_RANGE.MIN && value <= LOTTO.NUMBER_RANGE.MAX;

export const isValidlottoNumbers = (lottoNumbers) =>
  lottoNumbers.length === LOTTO.NUMBER_LENGTH &&
  lottoNumbers.every(
    (lottoNumber) =>
      isValidLottoNumberRange(lottoNumber) && Number.isInteger(lottoNumber)
  );

export const isValidLotto = (lotto) => isValidlottoNumbers(lotto.getNumbers());

export const isValidLottoList = (lottoList, count) =>
  lottoList.length === count &&
  lottoList.every((lotto) => lotto instanceof Lotto);

export const validator = {
  checkPurchaseAmount: (purchaseAmount) => {
    if (!isNumber(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
    }

    if (!isDividedByThousand(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
    }

    if (!isValidPurchaseAmountRange(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);
    }
  },
};
