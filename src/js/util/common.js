import { RULES } from '../constants/index.js';

const convertToNumber = value => Number(value);

// min~max 중 랜덤으로 하나의 정수 값을 반환
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pickLottoNumber = n => {
  const lottos = new Set();

  while (lottos.size < n) {
    const number = getRandomNumber(
      RULES.MIN_LOTTO_NUMBER,
      RULES.MAX_LOTTO_NUMBER,
    );

    lottos.add(number);
  }

  return [...lottos];
};

export { convertToNumber, pickLottoNumber };
