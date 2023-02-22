const CORRECT_COUNT_PER_RANK = Object.freeze({
  FIRST_RANK: 6,
  SECOND_RANK: 5,
  THIRD_RANK: 5,
  FOURTH_RANK: 4,
  FIFTH_RANK: 3,
});

const EMPTY_STRING = '';

const INDEX_TO_KEY_CONVERTER = Object.freeze([
  'FIRST_RANK',
  'SECOND_RANK',
  'THIRD_RANK',
  'FOURTH_RANK',
  'FIFTH_RANK',
]);

const LOTTO_NUMBER_COUNT = 6;

const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
});

const PRICE_UNIT = 1_000;

const PROFIT = Object.freeze({
  FIRST_RANK: 2_000_000_000,
  SECOND_RANK: 30_000_000,
  THIRD_RANK: 1_500_000,
  FOURTH_RANK: 50_000,
  FIFTH_RANK: 5_000,
});

const PROFIT_PER_RANK = Object.freeze([
  PROFIT.FIRST_RANK,
  PROFIT.SECOND_RANK,
  PROFIT.THIRD_RANK,
  PROFIT.FOURTH_RANK,
  PROFIT.FIFTH_RANK,
]);

const RANK = Object.freeze({
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
});

const REGEX = Object.freeze({
  BLANK: /\s/,
  RESTART_COMMAND: /y|n/,
  PRICE_FORMAT: /\B(?=(\d{3})+(?!\d))/g,
  NUMBER: /^[0-9]+$/,
});

const RESTART_COMMAND = Object.freeze({
  YES: 'y',
  NO: 'n',
});

const CONSOLE_MESSAGE = Object.freeze({
  ASK_PURCHASE_PRICE: '> 구입금액을 입력해 주세요.',
  showLottoCount: (lottoCount) => `총 ${lottoCount}개를 구매했습니다.`,
  ASK_WINNING_NUMBERS: '> 당첨 번호를 입력해 주세요. ',
  ASK_BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요. ',
  RESULT_HEADER: '\n당첨 통계\n--------------------',
  showProfitRate: (profitRate) => `총 수익률은 ${profitRate}%입니다.\n`,
  ASK_RESTART_COMMAND: '> 다시 시작하시겠습니까? (y/n)',
});

const ERROR_MESSAGE = Object.freeze({
  BLANK: '공백 없이 입력해주세요.',
  EMPTY: '아무것도 입력하지 않았습니다.',
  NUMBER: '숫자만 입력해주세요.',
  UNIT: `구매 금액은 ${PRICE_UNIT}원 단위로 입력해주세요`,
  PRICE_RANGE: `구매 금액은 ${PRICE_UNIT}원 이상으로 입력해주세요.`,
  COUNT: `당첨 번호는 ${LOTTO_NUMBER_COUNT}개로 입력해주세요.`,
  LOTTO_RANGE: `당첨 번호는 ${LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER}부터 ${LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER}까지의 숫자만 입력해주세요.`,
  DUPLICATE: '당첨 번호는 서로 중복되지 않게 입력해주세요.',
  WINNING_NUMBERS_ERROR: `당첨 번호는 ${LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER}부터 ${LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER}까지 ${LOTTO_NUMBER_COUNT}개의 숫자로 중복없이 입력해주세요.`,
  BONUS_NUMBER_ERROR: `보너스 번호는 ${LOTTO_NUMBER_RANGE.MIN_LOTTO_NUMBER}부터 ${LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER}까지의 숫자로 당첨 번호와 중복없이 입력해주세요.`,
  RESTART_COMMAND_ERROR: `${RESTART_COMMAND.YES} 또는 ${RESTART_COMMAND.NO}으로만 입력해주세요.`,
});

module.exports = {
  CORRECT_COUNT_PER_RANK,
  CONSOLE_MESSAGE,
  EMPTY_STRING,
  ERROR_MESSAGE,
  INDEX_TO_KEY_CONVERTER,
  LOTTO_NUMBER_COUNT,
  LOTTO_NUMBER_RANGE,
  PROFIT,
  PROFIT_PER_RANK,
  PRICE_UNIT,
  RANK,
  REGEX,
  RESTART_COMMAND,
};
