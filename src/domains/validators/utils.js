import { LOTTO_RULE, RANDOM_NUMBER_RULE } from '../../constants';

export const isInteger = (number) => Number.isInteger(number);

// 로또 넘버
export const isValidLottoNumberCount = (numbers) => {
  const { matchedCount } = LOTTO_RULE;

  return numbers.length === matchedCount;
};

export const isNotDuplicatedLottoNumber = (numbers) =>
  numbers.length === new Set(numbers).size;

export const isLottoNumberInRange = (number) => {
  const { start, end } = RANDOM_NUMBER_RULE.range;

  return start <= number && number <= end;
};

export const isNotInLottoNumber = (lottoNumbers, bonusNumber) =>
  !lottoNumbers.includes(bonusNumber);

// 구매 금액
export const isDivisibleByPrice = (money) => money % LOTTO_RULE.price === 0;

export const isValidNumbersOfTickets = (money) => {
  const { price, numbersOfTickets } = LOTTO_RULE;
  const { min, max } = numbersOfTickets;
  const tickets = money / price;

  return tickets >= min && tickets <= max;
};

export const isValidWinningNumbersForm = (string) =>
  /^(\d+,)*\d+$/.test(string);
