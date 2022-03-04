import { RULES } from '../constants/index.js';

export const isEmpty = value => {
  return value === null;
};

export const isZero = value => {
  return value === 0;
};

export const isNotNumber = value => {
  return Number.isNaN(value) || typeof value !== 'number';
};

export const isNegativeNumber = value => {
  return value < 0;
};

export const isDuplicated = list => {
  return list.length !== [...new Set(list)].length;
};

export const isNotThousandUnit = value => {
  return value % RULES.LOTTO_PRICE !== 0;
};

export const convertToNumber = value => {
  return Number(value);
};

export const pickLottoNumber = count => {
  //로또번호 1 ~ 45를 소유하고 있는 배열
  const lottoNumbers = Array.from(
    { length: RULES.MAX_LOTTO_NUMBER },
    (_, index) => index + 1,
  );

  const shuffledLottoNumbers = shuffleArray(lottoNumbers);
  const numbers = [];

  for (let i = 0; i < count; i++) {
    numbers.push(shuffledLottoNumbers.pop());
  }

  return numbers;
};

const shuffleArray = inputArray => {
  return inputArray.slice().sort(() => Math.random() - 0.5);
};
