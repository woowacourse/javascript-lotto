export const VALUE = {
  LOTTO: {
    TICKET_LENGH: 6,
    TICKET_PRICE: 1000,
    MIN_NUM: 1,
    MAX_NUM: 45,
  },

  HIT_COUNT: {
    NONE: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
  },

  WINNING_RANK: {
    NONE: 0,
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
  },

  WINNING_PRICE: {
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000,
    NONE: 0,
  },
};

export const ERROR_MESSAGE = {
  LOTTO: {
    INVALID_PRICE: `${VALUE.LOTTO.TICKET_PRICE}원 이상의 금액만 입력이 가능합니다.`,
    OVER_PURCHASE: '구매 가능한 갯수만큼만 번호를 입력할 수 있습니다.',
  },

  WINNING_NUMBER: {
    DUPLICATE: '중복된 값은 입력할 수 없습니다.',
    OUT_OF_RANGE: `${VALUE.LOTTO.MIN_NUM} ~ ${VALUE.LOTTO.MAX_NUM} 사이의 값만 입력이 가능합니다.`,
  },

  WINNING_NUMBER: {
    DUPLICATE: '중복된 값은 입력할 수 없습니다.',
    OUT_OF_RANGE: `${VALUE.LOTTO.MIN_NUM} ~ ${VALUE.LOTTO.MAX_NUM} 사이의 값만 입력이 가능합니다.`,
  },
};
