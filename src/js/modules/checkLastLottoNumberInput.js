import { LOTTO_INFO } from '../constants/constant.js';
import {
  IS_OVERLAP_LOTTO_NUMBER_ERROR,
  NOT_NUMBER_IN_RANGE,
  NOT_NUMBER_TYPE_ERROR,
  NOT_POSITIVE_NUMBER_ERROR,
} from '../constants/errorMessage.js';
import { isPositiveNumber, isValueTypeNumber } from './checkInputValue.js';

export const getLastLottoNumbers = () => {
  const lastLottoNumbers = [];
  document
    .querySelectorAll('.last-lotto-winning-number-input')
    .forEach(lastLottoNum => {
      lastLottoNumbers.push(Number(lastLottoNum.value));
    });
  if (checkLastLottoNumberValid(lastLottoNumbers)) {
    return lastLottoNumbers;
  }
  return false;
};

export const checkLastLottoNumberValid = lastLottoNumbers => {
  try {
    let isLottoNumberInputPositive = false;
    let isLottoNumberInRange = false;
    if (checkLastLottoNumbersType(lastLottoNumbers)) {
      isLottoNumberInputPositive =
        checkLastLottoNumbersPositive(lastLottoNumbers);
    }
    if (isLottoNumberInputPositive) {
      isLottoNumberInRange = checkLastLottoNumbersInRange(lastLottoNumbers);
    }
    if (isLottoNumberInRange) {
      return checkLastLottoNumbersOverlap(lastLottoNumbers);
    }
    return isLottoNumberInRange;
  } catch (err) {
    window.alert('지난 로또 번호 입력창에는 ' + err.message);
  }
};

export const checkLastLottoNumbersType = lastLottoNumbers => {
  if (
    lastLottoNumbers.filter(num => {
      return isValueTypeNumber(num) != true;
    }).length > 0
  ) {
    throw new Error(NOT_NUMBER_TYPE_ERROR);
  }
  return true;
};

export const checkLastLottoNumbersPositive = lastLottoNumbers => {
  if (
    lastLottoNumbers.filter(num => {
      return isPositiveNumber(num) != true;
    }).length > 0
  ) {
    throw new Error(NOT_POSITIVE_NUMBER_ERROR);
  }
  return true;
};

export const checkLastLottoNumbersOverlap = lastLottoNumbers => {
  if (lastLottoNumbers.length === new Set(lastLottoNumbers).size) {
    return true;
  }
  throw new Error(IS_OVERLAP_LOTTO_NUMBER_ERROR);
};

export const checkLastLottoNumbersInRange = lastLottoNumbers => {
  if (
    lastLottoNumbers.filter(
      num =>
        num > LOTTO_INFO.LOTTO_NUMBER_MAX || num < LOTTO_INFO.LOTTO_NUMBER_MIN,
    ).length
  ) {
    throw new Error(NOT_NUMBER_IN_RANGE);
  }
  return true;
};
