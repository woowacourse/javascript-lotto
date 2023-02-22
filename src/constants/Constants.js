import formatNumber from '../utils/NumberFormatter.js';

const StaticValue = Object.freeze({
  PURCHASE_AMOUNT_UNIT: 1000,
  REGEX_NON_DIGIT: /\D|^$/,
  MATCH_FIVE_AND_BONUS: 5.5,
  LOTTO_LOWER_INCLUSIVE: 1,
  LOTTO_UPPER_INCLUSIVE: 45,
  LOTTO_LENGTH: 6,
  MATCH_FIVE: 5,
  PRINT_SEPARATOR: ', ',
});

const MatchCount = Object.freeze({
  6: 'SIX',
  5.5: 'FIVE_AND_BONUS',
  5: 'FIVE',
  4: 'FOUR',
  3: 'THREE',
  2: 'TWO',
  1: 'ONE',
  0: 'ZERO',
});

const InitialRank = Object.freeze({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
});

const Rank = Object.freeze({
  SIX: 1,
  FIVE_AND_BONUS: 2,
  FIVE: 3,
  FOUR: 4,
  THREE: 5,
  TWO: 6,
  ONE: 6,
  ZERO: 6,
});

const Prize = Object.freeze({
  1: 2_000_000_000,
  2: 30_000_000,
  3: 1_500_000,
  4: 50_000,
  5: 5_000,
  6: 0,
});

const Message = Object.freeze({
  purchaseCount: (count) => `총 ${count}개를 구매했습니다.`,
  matchCount: (count) =>  `${count}개`,
  profitRateResult: (profitRate) => `당신의 총 수익률은 ${formatNumber(profitRate)}% 입니다.`,
});

const ErrorMessage = Object.freeze({
  MONEY_VALUE: `로또 구입 금액은 ${StaticValue.PURCHASE_AMOUNT_UNIT}원 단위로 입력해 주세요.`,
  MINIMUM_VALUE: `로또 구입 금액은 ${StaticValue.PURCHASE_AMOUNT_UNIT}원 이상이여야 합니다.`,
  MONEY_INPUT_TYPE: '로또 구입 금액은 숫자만 입력해 주세요.',
  LOTTO_VALUE: `로또 번호는 ${StaticValue.LOTTO_LOWER_INCLUSIVE}~${StaticValue.LOTTO_UPPER_INCLUSIVE} 사이의 숫자를 입력해주세요.`,
  LOTTO_LENGTH: `로또 당첨 번호 ${StaticValue.LOTTO_LENGTH}개를 입력해주세요.`,
  LOTTO_DUPLICATE: '로또 번호는 중복되지 않게 입력해주세요.',
  BONUS_NUMBER_DUPLICATE: '보너스 번호는 로또 번호와 중복되지 않게 입력해주세요.',
  BONUS_NUMBER_VALUE: `보너스 번호는 ${StaticValue.LOTTO_LOWER_INCLUSIVE}~${StaticValue.LOTTO_UPPER_INCLUSIVE} 사이의 숫자를 입력해주세요.`,
  RESTART: `${StaticValue.RESTART_CONTROL} 또는 ${StaticValue.QUIT_CONTROL}을 입력해주세요.`,
});

export {
  StaticValue,
  MatchCount,
  InitialRank,
  Rank,
  Prize,
  Message,
  ErrorMessage,
};
