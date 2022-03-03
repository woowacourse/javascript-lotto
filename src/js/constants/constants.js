export const CONDITIONS = {
  LOTTO_SIZE: 6,
  LOTTO_NUM_MIN: 1,
  LOTTO_NUM_MAX: 45,
  LOTTO_PRICE: 1000,
};

export const ERROR_MESSAGE = {
  NEGATIVE_INPUT_ERROR: 'please enter positive number',
  NOT_INTEGER_INPUT_ERROR: 'please enter integer number',
  NOT_MUTIPLE_THOUSAND: 'please enter number that is mutiples of thousand',
  NULL_INPUT_ERROR: 'please enter input',
  HAS_DUPLICATED_WINNING_NUMBER: 'please enter winning number without duplication',
  HAS_DUPLICATED_BONUS_NUMBER: 'please enter bonus number without duplicaiton',
  HAS_OUT_OF_RANGE_NUMBER: `please enter winning number between ${CONDITIONS.LOTTO_NUM_MIN} and ${CONDITIONS.LOTTO_NUM_MAX}`,
  HAS_OUT_OF_RANGE_BONUS_NUMBER: `please enter bonus number between ${CONDITIONS.LOTTO_NUM_MIN} and ${CONDITIONS.LOTTO_NUM_MAX}`,
};

export const WINNING_PRICE = {
  MATCH_SIX: 2000000000,
  MATCH_FIVE_BONUS: 30000000,
  MATCH_FIVE: 1500000,
  MATCH_FOUR: 50000,
  MATCH_THREE: 5000,
};
