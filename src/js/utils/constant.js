export const VALUE = {
  LOTTO: {
    TICKET_LENGTH: 6,
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

export const ERR_MESSAGE = {
  LOTTO: {
    INVALID_PRICE: `${VALUE.LOTTO.TICKET_PRICE}원 이상의 금액만 입력이 가능합니다.`,
    INVALID_TICKET_COUNT:
      '현재 남은 금액을 초과하는 로또 티켓은 구매하실 수 없습니다.',
  },

  WINNING_NUMBER: {
    DUPLICATE: '중복된 값은 입력할 수 없습니다.',
    OUT_OF_RANGE: `${VALUE.LOTTO.MIN_NUM} ~ ${VALUE.LOTTO.MAX_NUM} 사이의 값만 입력이 가능합니다.`,
  },
};

export const MESSAGE = {
  LOTTO: {
    SMALL_CHANGE: (smallChange) =>
      `거스름돈은 ${smallChange}원입니다! 잊지 말고 챙겨가세요!`,
  },
};
