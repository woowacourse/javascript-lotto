import { NUMBER } from '../constants/number';

export function isValidLength(lottoNumber) {
  return lottoNumber.length === NUMBER.LOTTO_NUMBER_LENGTH;
}

export function isValidLottoNumbers(lottoNumbers) {
  return isValidEveryLottoNumber(lottoNumbers) && hasNotDuplicatedNumber(lottoNumbers);
}

export function isValidCharge(charge) {
  return (
    Number.isInteger(charge) && charge >= NUMBER.LOTTO_PRICE && charge <= NUMBER.LOTTO_MAX_PRICE
  );
}

export function hasNotDuplicatedNumber(array) {
  return array.length === [...new Set(array)].length;
}

export function isValidEveryLottoNumber(array) {
  return array.every(
    (number) =>
      Number.isInteger(number) &&
      number >= NUMBER.LOTTO_MIN_NUMBER &&
      number <= NUMBER.LOTTO_MAX_NUMBER
  );
}
