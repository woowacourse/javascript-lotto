export const VALUE = {
  LOTTO: {
    TICKET_PRICE: 1000,
    MIN_NUM: 1,
    MAX_NUM: 45,
  },
};

export const ERR_MESSAGE = {
  LOTTO: {
    INVALID_PRICE: `${VALUE.LOTTO.TICKET_PRICE}원 이상의 금액만 입력이 가능합니다.`,
  },

  WINNING_NUMBER: {
    DUPLICATE: '중복된 값은 입력할 수 없습니다.',
    OUT_OF_RANGE: `${VALUE.LOTTO.MIN_NUM} ~ ${VALUE.LOTTO.MAX_NUM} 사이의 값만 입력이 가능합니다.`,
  },
};
