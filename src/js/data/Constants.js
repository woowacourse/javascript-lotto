const LOTTO_CONSTANT = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
  PRICE: 1000,
  LOTTO_NUMBER: '로또 번호',
  BUDGET: '구입 금액',
  COMMAND_RETRY: 'y',
  COMMAND_QUIT: 'n',
});

const LOTTO_RANKING = Object.freeze({
  FIRST: 'first',
  SECOND: 'second',
  THIRD: 'third',
  FOURTH: 'fourth',
  FIFTH: 'fifth',
});

const MATCHES_COUNT_TO_RANKING = Object.freeze({
  6: 'first',
  5: 'third',
  4: 'fourth',
  3: 'fifth',
});

const RANKING_TO_MATCHES_COUNT = Object.freeze({
  first: 6,
  second: 5,
  third: 5,
  fourth: 4,
  fifth: 3,
});

const WINNING_PRIZE = Object.freeze({
  first: 2_000_000_000,
  second: 30_000_000,
  third: 1_500_000,
  fourth: 50_000,
  fifth: 5_000,
  fail: 0,
});

const PRINT_MESSAGE = Object.freeze({
  INPUT_BUDGET: '구입금액을 입력해 주세요.',
  PURCHASE_COUNT: (count) => `${count}개를 구매했습니다.`,
  INPUT_WINNING_NUMBER: '당첨 번호를 입력해 주세요. ',
  INPUT_BONUS_NUMBER: '보너스 번호를 입력해 주세요. ',
  WINNING_STATISTICS: '당첨 통계',
  LINE: '--------------------',
  STATISTICS_RANKING: (winningCount, rank) =>
    `${RANKING_TO_MATCHES_COUNT[rank]}개 일치 (${WINNING_PRIZE[rank].toLocaleString(
      'en'
    )}원) - ${winningCount}개`,
  STATISTICS_RANKING_SECOND: (winningCount, rank) =>
    `${RANKING_TO_MATCHES_COUNT[rank]}개 일치, 보너스 볼 일치 (${WINNING_PRIZE[rank].toLocaleString(
      'en'
    )}원) - ${winningCount}개`,
  YIELD_RATE: (yieldRate) => `총 수익률은 ${yieldRate}%입니다.`,
  INPUT_RETRY: `다시 시작하시겠습니까? (${LOTTO_CONSTANT.COMMAND_RETRY}/${LOTTO_CONSTANT.COMMAND_QUIT}) `,
});

const ERROR_MESSAGE = Object.freeze({
  NOT_INTEGER: (subject) => `${subject}은(는) 숫자여야 합니다`,
  LOTTO_NUMBER_RANGE: (subject) =>
    `${subject}은(는) ${LOTTO_CONSTANT.MIN_NUMBER}~${LOTTO_CONSTANT.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  LOTTO_NUMBER_DUPLICATE: (subject) => `${subject}은(는) 중복될 수 없습니다.`,
  LOTTO_LENGTH_LIMIT: `로또는 ${LOTTO_CONSTANT.LENGTH}개의 수로 이루어져있습니다.`,
  BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE: '구입 금액은 로또 가격으로 나뉘어 떨어져야 합니다.',
  BUDGET_LESS_THAN_LOTTO_PRICE: '구입 금액은 로또 가격보다 커야 합니다',
  RETRY_COMMAND: `${LOTTO_CONSTANT.COMMAND_RETRY}나 ${LOTTO_CONSTANT.COMMAND_QUIT}만 입력 가능합니다.`,
});

export {
  LOTTO_CONSTANT,
  LOTTO_RANKING,
  MATCHES_COUNT_TO_RANKING,
  RANKING_TO_MATCHES_COUNT,
  WINNING_PRIZE,
  PRINT_MESSAGE,
  ERROR_MESSAGE,
};
