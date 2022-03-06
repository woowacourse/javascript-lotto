import Lotto from '../models/Lotto/Lotto.js';
import { LOTTO, ERROR_MESSAGE, PAYMENT } from '../configs/contants.js';

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
    return isValidLottoNumber(lottoNumber);
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

  checkLottoListExist: (lottoList) => {
    if (lottoList.length === 0) {
      throw new Error(ERROR_MESSAGE.DID_NOT_BUY_LOTTO);
    }
  },

  checkWinningAndBonusNumbers: (winningNumbers, bonusNumber) => {
    if (!isValidlottoNumbers(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_A_LOTTO_NUMBER);
    }
    if (!isValidDuplicatedLottoNumber(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.IS_DUPLICATED);
    }
    if (!isValidLottoNumber(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.NOT_A_BONUS_NUMBER);
    }
    if (isValidDuplicateBonus(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.IS_DUPLICATED_BONUS);
    }
  },
};

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidMinAmountRange(purchaseAmount) {
  return purchaseAmount >= PAYMENT.PURCHASE_AMOUNT.MIN;
}

function isValidMaxAmountRange(purchaseAmount) {
  return purchaseAmount <= PAYMENT.PURCHASE_AMOUNT.MAX;
}

function isValidLottoNumberRange(value) {
  return value >= LOTTO.NUMBER_RANGE.MIN && value <= LOTTO.NUMBER_RANGE.MAX;
}

function isValidLottoNumber(lottoNumber) {
  return Number.isInteger(lottoNumber) && isValidLottoNumberRange(lottoNumber);
}

function isValidlottoNumbers(lottoNumbers) {
  return (
    lottoNumbers.length === LOTTO.NUMBER_LENGTH &&
    lottoNumbers.every((lottoNumber) => isValidLottoNumber(lottoNumber))
  );
}

function isValidDuplicatedLottoNumber(lottoNumbers) {
  return lottoNumbers.length === new Set(lottoNumbers).size;
}

function isValidLottoList(lottoList, count) {
  return (
    lottoList.length === count &&
    lottoList.every((lotto) => lotto instanceof Lotto)
  );
}

function isValidDuplicateBonus(winningNumbers, bonusNumber) {
  return winningNumbers.includes(bonusNumber);
}

export default validator;
