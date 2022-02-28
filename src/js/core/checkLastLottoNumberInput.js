import {
  IS_OVERLAP_LOTTO_NUMBER_ERROR,
  NOT_NUMBER_IN_RANGE,
  NOT_NUMBER_TYPE_ERROR,
  NOT_POSITIVE_NUMBER_ERROR,
} from '../constants/errorMessage.js';
import {
  isPositiveNumber,
  isValueTypeNumber,
} from '../modules/checkInputValue.js';

export const getLastLottoNumbers = () => {
  const lastLottoNumbers = [];
  document
    .querySelectorAll('.last-lotto-winning-number-input')
    .forEach(lastLottoNum => {
      lastLottoNumbers.push(Number(lastLottoNum.value));
    });
  return lastLottoNumbers;
};

export const checkLastLottoNumberValid = () => {
  const lastLottoNumbers = getLastLottoNumbers();
  try {
    let isLottoNumberInputPositive = false;
    let isLottoNumberInRange = false;
    if (checkLastLottoNumbersType(lastLottoNumbers)) {
      isLottoNumberInputPositive =
        checkLastLottoNumberPositive(lastLottoNumbers);
    }
    if (isLottoNumberInputPositive) {
      isLottoNumberInRange = checkLottoNumberInRange(lastLottoNumbers);
    }
    if (isLottoNumberInRange) {
      checkLottoNumberOverlap(lastLottoNumbers);
    }
    return lastLottoNumbers;
  } catch (err) {
    window.alert('지난 로또 번호 입력창에는 ' + err.message);
  }
};

export const checkLastLottoNumbersType = lastLottoNumbers => {
  console.log('lastLotto');
  if (
    lastLottoNumbers.filter(num => isValueTypeNumber(num)).length !==
    lastLottoNumbers.length
  ) {
    throw new Error(NOT_NUMBER_TYPE_ERROR);
  }
  return true;
};

export const checkLastLottoNumberPositive = lastLottoNumbers => {
  if (
    lastLottoNumbers.filter(num => isPositiveNumber(num)).length !==
    lastLottoNumbers.length
  ) {
    throw new Error(NOT_POSITIVE_NUMBER_ERROR);
  }
  return true;
};

export const checkLottoNumberOverlap = lastLottoNumbers => {
  if (lastLottoNumbers.length === new Set(lastLottoNumbers).size) {
    return true;
  }
  throw new Error(IS_OVERLAP_LOTTO_NUMBER_ERROR);
};

export const checkLottoNumberInRange = lastLottoNumbers => {
  if (lastLottoNumbers.filter(num => num > 45 || num < 1).length) {
    throw new Error(NOT_NUMBER_IN_RANGE);
  }
  return true;
};
