import { NUMBER } from '../constants/number';

export function isValidLength(lottoNumber) {
  return lottoNumber.length === NUMBER.LOTTO_NUMBER_AMOUNT;
}

export function isValidNumber(lottoNumbers) {
  return !lottoNumbers.some(
    (number) =>
      !Number.isInteger(number) ||
      number < NUMBER.LOTTO_MIN_NUMBER ||
      number > NUMBER.LOTTO_MAX_NUMBER
  );
}

export function isNotValidNumber(number) {
  return number < 1 || number > 45;
}

export function isValidCharge(charge) {
  return Number.isInteger(charge) && charge >= NUMBER.LOTTO_PRICE;
}

export function getRandomNumber(array) {
  let randomNumber = Math.floor(Math.random() * 45) + 1;

  while (array.has(randomNumber)) {
    if (randomNumber >= 45) randomNumber = 1;
    else randomNumber += 1;
  }

  return randomNumber;
}

export function hasUniqueElement(element) {
  const uniqueSet = new Set(element);
  return uniqueSet.size === element.length;
}
