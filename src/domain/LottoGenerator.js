import { SETTINGS } from "../constants/index.js";
import { sortNumber } from "../utils/utils.js";

export const generateLotto = (amount) => {
  const ticketCount = Math.floor(amount / SETTINGS.priceUnit);

  return Array.from({ length: ticketCount }, createLottoNumbers);
};

export const createLottoNumbers = () => {
  const numbers = new Set();

  while (numbers.size < SETTINGS.numberCount) {
    const randomNumber = Math.floor(
        Math.random()
        * SETTINGS.numberRange.max)
      + SETTINGS.numberRange.min;
    numbers.add(randomNumber);
  }

  return sortNumber(Array.from(numbers));
};

