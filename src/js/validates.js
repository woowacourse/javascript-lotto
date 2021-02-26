export const isValidPrice = (price) => {
  return price > 0 && price % 1000 === 0; // price는 1000원 단위의 양수여야 한다.
};

export const isNumbersInRange = (numbers, min, max) => {
  return numbers.every((num) => min <= num && max >= num);
};

export const isDistinctNumbers = (numbers) => {
  const numbersSet = new Set(numbers);

  return numbersSet.size === numbers.length;
};
