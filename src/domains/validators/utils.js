import { LOTTO_RULE } from '../../constants';

export const isInteger = (number) => {
  return (number) => Number.isInteger(number);
};

// 로또 넘버
export const isValidLottoNumberCount = (numbers) => {
  const { count } = LOTTO_RULE;

  return numbers.length === count;
};

export const isDuplicatedLottoNumber = (numbers) => {
  return numbers.length !== new Set(numbers).size;
};

export const isLottoNumberInRange = (number) => {
  const { start, end } = RANDOM_NUMBER_RULE.range;

  return start <= number && number <= end;
};

// 구매 금액
export const isDivisibleByPrice = (money) => {
  return money % LOTTO_RULE.price === 0;
};

export const isValidNumbersOfTickets = (money) => {
  const { price, numbersOfTickets } = LOTTO_RULE;
  const { min, max } = numbersOfTickets;
  const tickets = money / price;

  return tickets >= min && tickets <= max;
};
