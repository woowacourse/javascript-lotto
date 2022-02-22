import { NUMBER } from "../constants/number";

export function isValidLength(lottoNumber) {
  return lottoNumber.length === NUMBER.LOTTO_NUMBER_LENGTH;
}

export function isValidNumber(lottoNumbers) {
  return lottoNumbers.every(
    (number) =>
      Number.isInteger(number) &&
      number >= NUMBER.LOTTO_MIN_NUMBER &&
      number <= NUMBER.LOTTO_MAX_NUMBER
  );
}

export function isValidCharge(charge) {
  return Number.isInteger(charge) && charge >= NUMBER.LOTTO_PRICE;
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 45) + 1;
}
