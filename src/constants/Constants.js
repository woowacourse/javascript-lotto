const GameControlStaticValue = Object.freeze({
  PURCHASE_AMOUNT_UNIT: 1_000,
  PERCENTAGE_DIVIDER: 100,
  PURCHASE_AMOUNT_LIMIT: 100_000,
  RESTART_BUTTON: 'y',
  QUIT_BUTTON: 'n',
  INPUT_SEPARATOR: ',',
  PRINT_SEPARATOR: ', ',
});

const RandomNumberStaticValue = Object.freeze({
  LOWER_INCLUSIVE: 1,
  UPPER_INCLUSIVE: 45,
  LENGTH: 6,
});

const LottoStaticValue = Object.freeze({
  TOTAL_ARRAY_LENGTH: 12,
  MATCH_FIVE_AND_BONUS: 5.5,
  MATCH_FIVE: 5,
});

const Regex = Object.freeze({
  NON_DIGIT: /\D|^$/,
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

const RequestMessage = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요. ',
  WINNING_NUMBER: '당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요. ',
  RESTART: `다시 시작하시겠습니까? (${GameControlStaticValue.RESTART_BUTTON}/${GameControlStaticValue.QUIT_BUTTON}) `,
});

const ResultMessage = Object.freeze({
  RESULT: '당첨 통계\n--------------------',
});

const ErrorMessage = Object.freeze({
  MONEY_VALUE: `[ERROR] 로또 구입 금액은 ${GameControlStaticValue.PURCHASE_AMOUNT_UNIT}원 단위로 입력해 주세요.`,
  MONEY_LIMIT: `[ERROR] 로또 구입 금액은 ${GameControlStaticValue.PURCHASE_AMOUNT_LIMIT}원 이상은 구매할 수 없습니다.`,
  MINMUM_VALUE: `[ERROR] 로또 구입 금액은 ${GameControlStaticValue.PURCHASE_AMOUNT_UNIT}원 이상이여야 합니다.`,
  MONEY_INPUT_TYPE: '[ERROR] 로또 구입 금액은 숫자만 입력해 주세요.',
  LOTTO_VALUE: `[ERROR] 로또 번호는 ${RandomNumberStaticValue.LOWER_INCLUSIVE}~${RandomNumberStaticValue.UPPER_INCLUSIVE} 사이의 숫자를 입력해주세요.`,
  LOTTO_LENGTH: `[ERROR] 로또 당첨 번호 ${RandomNumberStaticValue.LENGTH}개를 입력해주세요.`,
  LOTTO_DUPLICATE: '[ERROR] 로또 번호는 중복되지 않게 입력해주세요.',
  BONUS_NUMBER_DUPLICATE: '[ERROR] 보너스 번호는 로또 번호와 중복되지 않게 입력해주세요.',
  BONUS_NUMBER_VALUE: `[ERROR] 보너스 번호는 ${RandomNumberStaticValue.LOWER_INCLUSIVE}~${RandomNumberStaticValue.UPPER_INCLUSIVE} 사이의 숫자를 입력해주세요.`,
  RESTART: `[ERROR] ${GameControlStaticValue.RESTART_BUTTON} 또는 ${GameControlStaticValue.QUIT_BUTTON}을 입력해주세요.`,
});

export {
  GameControlStaticValue,
  RandomNumberStaticValue,
  LottoStaticValue,
  Regex,
  MatchCount,
  Rank,
  Prize,
  RequestMessage,
  ResultMessage,
  ErrorMessage,
};
