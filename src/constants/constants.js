const readline = require('readline');

const PRICE_UNIT = 1_000;
const BLANK_REGEXP = /\s/;
const RESTART_COMMAND_REGEXP = /y|n/;
const EMPTY_STRING = '';
const LOTTO_NUMBER_COUNT = 6;

const lottoNumberRange = Object.freeze({
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
});

const profit = Object.freeze({
  FIRST_RANK: 2_000_000_000,
  SECOND_RANK: 30_000_000,
  THIRD_RANK: 1_500_000,
  FOURTH_RANK: 50_000,
  FIFTH_RANK: 5_000,
});

const profitByRank = Object.freeze([
  profit.FIRST_RANK,
  profit.SECOND_RANK,
  profit.THIRD_RANK,
  profit.FOURTH_RANK,
  profit.FIFTH_RANK,
]);

const correctCountPerRank = Object.freeze({
  FIRST_RANK: 6,
  SECOND_RANK: 5,
  THIRD_RANK: 5,
  FOURTH_RANK: 4,
  FIFTH_RANK: 3,
});

const RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const consoleMessage = Object.freeze({
  ASK_PURCHASE_PRICE: '구입금액을 입력해 주세요.',
  showLottoCount: (lottoCount) => `${lottoCount}개를 구매했습니다.`,
  ASK_WINNING_NUMBERS: '당첨 번호를 입력해 주세요.',
  ASK_BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  RESULT_HEADER: '당첨 통계\n-- -----------------',

  showProfitRate: (profitRate) => `총 수익률은 ${profitRate}입니다.`,
  ASK_RESTART_COMMAND: '다시 시작하시겠습니까? (y/n)',
});

module.exports = {
  PRICE_UNIT,
  BLANK_REGEXP,
  RESTART_COMMAND_REGEXP,
  EMPTY_STRING,
  lottoNumberRange,
  profit,
  profitByRank,
  LOTTO_NUMBER_COUNT,
  correctCountPerRank,
  RL,
  consoleMessage,
};
