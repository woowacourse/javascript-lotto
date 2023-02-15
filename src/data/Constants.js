const PRIZE = Object.freeze({
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
});

const WINNING_RESULT = Object.freeze({
  5: (count) => `3개 일치 (5,000원) - ${count}개`,
  4: (count) => `4개 일치 (50,000원) - ${count}개`,
  3: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  2: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  1: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
});

const MATCH_RANK = Object.freeze({
  3: 5,
  4: 4,
  5: 3,
  bonus: 2,
  6: 1,
});

const WINNING_ORDER = [5, 4, 3, 2, 1];
const MINIMUM_LOTTO_UNIT = 1000;
const LOTTO_LENGTH = 6;
const MAX_LOTTO_NUMBER = 45;
const MIN_LOTTO_NUMBER = 1;

const MESSAGE = Object.freeze({
  INPUT_PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
  INPUT_WINNING_NUMBER: '당첨 번호를 입력해 주세요. ',
  INPUT_BONUS_NUMBER: '보너스 번호를 입력해 주세요. ',
  INPUT_WHETHER_TO_RESTART: '> 다시 시작하시겠습니까? (y/n)',
  OUTPUT_LOTTO_COUNT: '개를 구매했습니다.',
  OUTPUT_WINNING_STATISTICS: '당첨 통계',
  OUTPUT_DIVIDE_LINE: '--------------------',
  OUTPUT_EARNING_RATE: (earningRate) => `총 수익률은 ${earningRate}%입니다.`,
});

const ERROR_MESSAGE = Object.freeze({
  NOT_NUMBER: '숫자를 입력해주세요.',
  NOT_DIVIDE_MINIMUM_LOTTO_UNIT: `${MINIMUM_LOTTO_UNIT.toLocaleString(
    'ko-KR'
  )}단위의 값을 입력해주세요.`,
  NOT_POSITIVE_NUMBER: '양수를 입력해주세요.',
  DUPLICATE_NUMBER: '중복되는 숫자는 입력할 수 없습니다.',
  OVER_RANGE: `${MIN_LOTTO_NUMBER} ~ ${MAX_LOTTO_NUMBER} 사이의 값을 입력해주세요.`,
  NOT_MATCH_LENGTH: `길이는 ${LOTTO_LENGTH} 이여야 합니다.`,
});

export {
  PRIZE,
  MESSAGE,
  WINNING_RESULT,
  WINNING_ORDER,
  MINIMUM_LOTTO_UNIT,
  LOTTO_LENGTH,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  MATCH_RANK,
  ERROR_MESSAGE,
};
