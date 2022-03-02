import Lotto from '../models/Lotto/Lotto.js';
import { LOTTO, ERROR_MESSAGE, PAYMENT } from '../configs/contants.js';

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

const isValidMinAmountRange = (purchaseAmount) => {
  return purchaseAmount >= PAYMENT.PURCHASE_AMOUNT.MIN;
};

const isValidMaxAmountRange = (purchaseAmount) => {
  return purchaseAmount <= PAYMENT.PURCHASE_AMOUNT.MAX;
};

const isValidLottoNumberRange = (value) =>
  value >= LOTTO.NUMBER_RANGE.MIN && value <= LOTTO.NUMBER_RANGE.MAX;

const isValidlottoNumbers = (lottoNumbers) =>
  lottoNumbers.length === LOTTO.NUMBER_LENGTH &&
  lottoNumbers.every(
    (lottoNumber) =>
      isValidLottoNumberRange(lottoNumber) && Number.isInteger(lottoNumber)
  );

const isValidDuplicatedLottoNumber = (lottoNumbers) =>
  lottoNumbers.length === new Set(lottoNumbers).size;

const isValidLottoList = (lottoList, count) =>
  lottoList.length === count &&
  lottoList.every((lotto) => lotto instanceof Lotto);

const validator = {
  checkPurchaseAmount: (purchaseAmount) => {
    if (!isNumber(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.NOT_A_AMOUNT_NUMBER);
    }
    if (!isValidMinAmountRange(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_MIN_AMOUNT_RANGE);
    }
    if (!isValidMaxAmountRange(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_MAX_AMOUNT_RANGE);
    }
  },

  checkLottoNumber: (lottoNumber) => {
    return (
      Number.isInteger(lottoNumber) && isValidLottoNumberRange(lottoNumber)
    );
  },

  checkLottoNumberList: (lottoNumbers) => {
    return (
      isValidlottoNumbers(lottoNumbers) &&
      isValidDuplicatedLottoNumber(lottoNumbers)
    );
  },

  checkLottoList: (lottoList, count) => {
    return isValidLottoList(lottoList, count);
  },

  checkWinningNumberList: (winningNumbers) => {
    if (!isValidlottoNumbers(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_A_LOTTO_NUMBER);
    }
    if (!isValidDuplicatedLottoNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.IS_DUPLICATED);
    }
  },
};

export default validator;
