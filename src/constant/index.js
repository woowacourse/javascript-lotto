const MAGIC_NUMBER = {
  secondRankIndex: 1,
  percent: 100,
  moneyUnit: 1_000,
  moneyLimit: 100_000,
  lottoStart: 1,
  lottoEnd: 45,
  winningNumberCount: 6,
  lottoNumberCount: 6,
  losing: 1234,
};

const MAGIC_LITERAL = {
  separator: ', ',
  retry: 'y',
  quit: 'n',
  comma: ',',
};

const ERROR_MESSAGE = {
  moneyRange: `[ERROR] 구매 금액을 ${MAGIC_NUMBER.moneyUnit.toLocaleString()}원 이상 ${MAGIC_NUMBER.moneyLimit.toLocaleString()}원 이하로 입력해 주세요.`,
  moneyUnit: `[ERROR] 구매 금액을 ${MAGIC_NUMBER.moneyUnit.toLocaleString()}원 단위로 입력해 주세요.`,
  number: '[ERROR] 숫자만 입력해 주세요.',
  lottoRange: `[ERROR] 로또 번호는 ${MAGIC_NUMBER.lottoStart}부터 ${MAGIC_NUMBER.lottoEnd}로 입력해 주세요.`,
  uniqueWinningNumber:
    '[ERROR] 당첨 번호는 중복되지 않는 값들로 입력해 주세요.',
  uniqueBonusNumber: '[ERROR] 당첨 번호와 중복되지 않는 값으로 입력해 주세요.',
  winningNumberCount: `[ERROR] 당첨 번호는 ${MAGIC_NUMBER.winningNumberCount}개로 입력해 주세요.`,
  retryOption: `[ERROR] 재시작 옵션은 ${MAGIC_LITERAL.retry} 혹은 ${MAGIC_LITERAL.quit}으로 입력해 주세요.`,
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

const RANK_TEMPLATE = [0, 0, 0, 0, 0];

module.exports = {
  ERROR_MESSAGE,
  MAGIC_NUMBER,
  MAGIC_LITERAL,
  RANK_INFORMATIONS,
  RANK_TEMPLATE,
};
