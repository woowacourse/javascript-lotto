const { addCommaToNumber } = require('../utils');

const LOTTO_NUMBER = Object.freeze({
  winningNumberCount: 6,
  lottoNumberCount: 6,
  lottoStart: 1,
  lottoEnd: 45,
  secondRankIndex: 1,
  moneyUnit: 1_000,
  moneyLimit: 100_000,
});

const CALCULATION_NUMBER = Object.freeze({
  percent: 100,
  losing: 1234,
  failFindIndex: -1,
});

const COMMAND_LITERAL = Object.freeze({
  retry: 'y',
  quit: 'n',
});

const LOTTO_LITERAL = Object.freeze({
  separator: ', ',
  comma: ',',
});

const ERROR_MESSAGE = {
  moneyRange: `[ERROR] 구매 금액을 ${addCommaToNumber(
    LOTTO_NUMBER.moneyUnit
  )}원 이상 ${addCommaToNumber(
    LOTTO_NUMBER.moneyLimit
  )}원 이하로 입력해 주세요.`,
  moneyUnit: `[ERROR] 구매 금액을 ${addCommaToNumber(
    LOTTO_NUMBER.moneyUnit
  )}원 단위로 입력해 주세요.`,
  number: '[ERROR] 자연수만 입력해 주세요.',
  lottoRange: `[ERROR] 로또 번호는 ${LOTTO_NUMBER.lottoStart}부터 ${LOTTO_NUMBER.lottoEnd}로 입력해 주세요.`,
  uniqueWinningNumber:
    '[ERROR] 당첨 번호는 중복되지 않는 값들로 입력해 주세요.',
  uniqueBonusNumber: '[ERROR] 당첨 번호와 중복되지 않는 값으로 입력해 주세요.',
  winningNumberCount: `[ERROR] 당첨 번호는 ${LOTTO_NUMBER.winningNumberCount}개로 입력해 주세요.`,
  retryOption: `[ERROR] 재시작 옵션은 ${COMMAND_LITERAL.retry} 혹은 ${COMMAND_LITERAL.quit}으로 입력해 주세요.`,
};

const RANK_INFORMATIONS = [
  {
    rank: 1,
    reward: 2_000_000_000,
    matchedCount: 6,
    isBonus: false,
  },
  {
    rank: 2,
    reward: 30_000_000,
    matchedCount: 5,
    isBonus: true,
  },
  {
    rank: 3,
    reward: 1_500_000,
    matchedCount: 5,
    isBonus: false,
  },
  {
    rank: 4,
    reward: 50_000,
    matchedCount: 4,
    isBonus: false,
  },
  {
    rank: 5,
    reward: 5_000,
    matchedCount: 3,
    isBonus: false,
  },
];

module.exports = {
  CALCULATION_NUMBER,
  COMMAND_LITERAL,
  ERROR_MESSAGE,
  LOTTO_LITERAL,
  LOTTO_NUMBER,
  RANK_INFORMATIONS,
};
