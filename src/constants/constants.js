export const LOTTO_CONDITION = {
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE: 1000,
};

export const MESSAGE = {
  PURCHASE_COUNT:"개를 구매했습니다.",
  STATISTICS:"당첨 통계",
  LINE:"--------------------"
}

export const LOTTO_NUMBER_ERROR_MESSAGES = {
  COUNT: `${LOTTO_CONDITION.COUNT}자리 숫자를 입력해주세요.`,
  INTIGER: '정수를 입력해주세요.',
  RANGE: `${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER} 사이의 숫자를 입력해주세요.`,
  DUPLICATE: '중복된 숫자가 존재합니다.',
};

export const PURCHASE_NUMBER_ERROR_MESSAGES = {
  INTIGER: '정수를 입력해주세요.',
  UNIT: `${LOTTO_CONDITION.PRICE}원 단위로 입력해주세요.`,
  MIN: `${LOTTO_CONDITION.PRICE}원 이상 입력해주세요.`,
};

export const Y_OR_NO_ERROR_MESSAGE = "y/n를 입력해주세요."

export const BONUS_NUMBER_ERROR_MESSAGES = {
  INTIGER: '정수를 입력해주세요.',
  RANGE: `${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER} 사이의 숫자를 입력해주세요.`,
  DUPLICATE: '당첨 번호와 중복되었습니다.'
}

export const RANKING = {
  FIRST: { RANK: 1, MATCH_COUNT: 6, PRIZE: 2_000_000_000 },
  SECOND: { RANK: 2, MATCH_COUNT: 5, PRIZE: 30_000_000 },
  THIRD: { RANK: 3, MATCH_COUNT: 5, PRIZE: 1_500_000 },
  FOURTH: { RANK: 4, MATCH_COUNT: 4, PRIZE: 50_000 },
  FIFTH: { RANK: 5, MATCH_COUNT: 3, PRIZE: 5_000 },
};

export const INPUT_MESSAGE = {
  PURCHASE: '구입금액을 입력해 주세요.',
  WINNING_NUMBERS: '당첨 번호를 입력해 주세요.',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  RE_START:'다시 시작하시겠습니까? (y/n)'
};

export const LINE_BREAK = '';

export const LOTTO_NUMBER_DELIMITER = ","

export const YES = "y"
export const NO = "n"