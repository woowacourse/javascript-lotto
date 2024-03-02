export const SYMBOL = {
  decimalPlaces: 1,
  hundred: 100,
  delimiter: ',',
  input_prefix: '>',
  space: ' ',
};

export const REGEXP = {
  numericPattern: /^\d+$/,
};

export const RANK = {
  first: '1st',
  second: '2nd',
  third: '3rd',
  fourth: '4th',
  fifth: '5th',
  sixth: '6th',
};

export const PRIZE = {
  [RANK.first]: 2_000_000_000,
  [RANK.second]: 30_000_000,
  [RANK.third]: 1_500_000,
  [RANK.fourth]: 50_000,
  [RANK.fifth]: 5_000,
};

export const LOTTO_RULES = {
  length: 6,
  min_number: 1,
  max_number: 45,
  min_cost: 1_000,
  max_cost: 100_000,
  cost: 1_000,
  restart: 'y',
  stop: 'n',
};
