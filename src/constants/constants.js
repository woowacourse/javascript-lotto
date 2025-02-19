export const LOTTO_CONDITION = {
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE: 1000,
};

export const MESSAGE = {
  PURCHASE_COUNT:"개를 구매했습니다.",
}

export const LOTTO_NUMBER_ERROR_MESSAGES = {
  COUNT: `로또 번호는 ${LOTTO_CONDITION.COUNT}자리여야 합니다.`,
  INTIGER: '로또 번호는 정수여야합니다.',
  RANGE: `각 숫자는 ${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER} 사이여야 한다.`,
  DUPLICATE: '숫자를 중복해서 입력하면 안된다.',
};

export const PURCHASE_NUMBER_ERROR_MESSAGES = {
  INTIGER: '정수를 입력해주세요.',
  UNIT: `${LOTTO_CONDITION.PRICE}원 단위로 입력해주세요.`,
  MIN: `${LOTTO_CONDITION.PRICE}원 이상 입력해주세요.`,
};

export const RANKING = {
  FIRST: { RANK: 1, MATCH_COUNT: 6, PRIZE_MONEY: 2_000_000_000 },
  SECOND: { RANK: 2, MATCH_COUNT: 5, PRIZE_MONEY: 30_000_000 },
  THIRD: { RANK: 3, MATCH_COUNT: 5, PRIZE_MONEY: 1_500_000 },
  FOURTH: { RANK: 4, MATCH_COUNT: 4, PRIZE_MONEY: 50_000 },
  FIFTH: { RANK: 5, MATCH_COUNT: 3, PRIZE_MONEY: 5_000 },
};

export const INPUT_MESSAGE = {
  PURCHASE_MONEY: '구입금액을 입력해 주세요.',
};

export const LINE_BREAK = '';

