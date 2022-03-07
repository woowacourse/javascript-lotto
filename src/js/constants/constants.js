export const CONDITIONS = {
  LOTTO_SIZE: 6,
  LOTTO_NUM_MIN: 1,
  LOTTO_NUM_MAX: 45,
  LOTTO_PRICE: 1000,
  MAX_MONEY_INPUT_LENGTH: 6,
};

export const ERROR_MESSAGE = {
  NEGATIVE_INPUT_ERROR: '양수를 입력해 주세요! \n (please enter positive number)',
  NOT_INTEGER_INPUT_ERROR: '정수를 입력해 주세요! \n (please enter integer number)',
  NOT_MUTIPLE_THOUSAND: '1000단위로 입력해 주세요! \n (please enter number that is mutiples of thousand)',
  NULL_INPUT_ERROR: '입력칸이 비어있어요! \n (please enter input)',
  HAS_DUPLICATED_WINNING_NUMBER:
    '당첨번호를 중복없이 입력해 주세요! \n (please enter winning number without duplication)',
  HAS_DUPLICATED_BONUS_NUMBER:
    '보너스 번호를 당첨번호와 중복없이 입력해주세요! \n (please enter bonus number without duplicaiton)',
  HAS_OUT_OF_RANGE_WINNING_NUMBER: `당첨번호는 ${CONDITIONS.LOTTO_NUM_MIN} 와 ${CONDITIONS.LOTTO_NUM_MAX} 사이여야 합니다! \n (please enter winning number between ${CONDITIONS.LOTTO_NUM_MIN} and ${CONDITIONS.LOTTO_NUM_MAX})`,
  HAS_OUT_OF_RANGE_BONUS_NUMBER: `보너스번호는 ${CONDITIONS.LOTTO_NUM_MIN} 와 ${CONDITIONS.LOTTO_NUM_MAX} 사이여야 합니다! \n (please enter bonus number between ${CONDITIONS.LOTTO_NUM_MIN} and ${CONDITIONS.LOTTO_NUM_MAX})`,
  NOT_ENOUGH_WINNING_NUMBER_INPUT: `당첨번호 ${CONDITIONS.LOTTO_SIZE}개 입력 부탁드립니다. \n(please enter winning ${CONDITIONS.LOTTO_SIZE}number)`,
  NOT_ENOUGH_BONUS_NUMBER_INPUT: `보너스번호 넣어주세요 \n(please enter bonus number)`,
};

export const WINNING_PRICE = {
  MATCH_SIX: 2000000000,
  MATCH_FIVE_BONUS: 30000000,
  MATCH_FIVE: 1500000,
  MATCH_FOUR: 50000,
  MATCH_THREE: 5000,
};
