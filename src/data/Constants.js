export const PRIZE = Object.freeze({
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
  NONE: 0,
});

export const WINNING_RESULT = Object.freeze({
  FIFTH: (count) => `3개 일치 (5,000원) - ${count}개`,
  FOURTH: (count) => `4개 일치 (50,000원) - ${count}개`,
  THIRD: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  SECOND: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  FIRST: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
});

export const CONVERT_RANK_TO_STRING = Object.freeze({
  1: 'FIRST',
  2: 'SECOND',
  3: 'THIRD',
  4: 'FOURTH',
  5: 'FIFTH',
  0: 'NONE',
});

export const MATCH_RANK = Object.freeze({
  FIFTH: 5,
  FOURTH: 4,
  THIRD: 3,
  SECOND: 2,
  FIRST: 1,
  NONE: 0,
});

export const WINNING_ORDER = Object.keys(MATCH_RANK);
export const MINIMUM_LOTTO_UNIT = 1000;
export const LOTTO_LENGTH = 6;
export const MAX_LOTTO_NUMBER = 45;
export const MIN_LOTTO_NUMBER = 1;
export const LOTTO_RANGE = [MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER];
export const YES = 'y';
export const NO = 'n';

export const MESSAGE = Object.freeze({
  INPUT_PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
  INPUT_WINNING_NUMBER: '당첨 번호를 입력해 주세요. ',
  INPUT_BONUS_NUMBER: '보너스 번호를 입력해 주세요. ',
  INPUT_WHETHER_TO_RESTART: `> 다시 시작하시겠습니까? (${YES}/${NO})`,
  OUTPUT_LOTTO_COUNT: '개를 구매했습니다.',
  OUTPUT_WINNING_STATISTICS: '당첨 통계',
  OUTPUT_DIVIDE_LINE: '--------------------',
  OUTPUT_EARNING_RATE: (earningRate) => `총 수익률은 ${earningRate}%입니다.`,
});

export const ERROR_MESSAGE = Object.freeze({
  NOT_NUMBER: '숫자를 입력해주세요.',
  NOT_DIVIDE_MINIMUM_LOTTO_UNIT: `${MINIMUM_LOTTO_UNIT.toLocaleString(
    'ko-KR'
  )}단위의 값을 입력해주세요.`,
  NOT_POSITIVE_NUMBER: '양수를 입력해주세요.',
  DUPLICATE_NUMBER: '중복되는 숫자는 입력할 수 없습니다.',
  OVER_RANGE: `${MIN_LOTTO_NUMBER} ~ ${MAX_LOTTO_NUMBER} 사이의 값을 입력해주세요.`,
  NOT_MATCH_LENGTH: `길이는 ${LOTTO_LENGTH} 이여야 합니다.`,
  DUPLICATE_WINNING_NUMBER: '당첨 번호와 중복되는 숫자는 입력할 수 없습니다.',
  NOT_INPUT_YES_OR_NO: `${YES} 또는 ${NO}만 입력하실 수 있습니다.`,
});
