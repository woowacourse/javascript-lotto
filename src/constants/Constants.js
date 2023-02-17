const StaticValue = Object.freeze({
  PURCHASE_AMOUNT_UNIT: 1000,
  REGEX_NON_DIGIT: /\D|^$/,
  MATCH_FIVE_AND_BONUS: 5.5,
  RESTART_CONTROL: 'y',
  QUIT_CONTROL: 'n',
  LOTTO_LOWER_INCLUSIVE: 1,
  LOTTO_UPPER_INCLUSIVE: 45,
  LOTTO_LENGTH: 6,
  MATCH_FIVE: 5,
  TOTAL_ARRAY_LENGTH: 12,
  INPUT_SEPARATOR: ',',
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
  5: 5000,
  6: 0,
});

const RequestMessage = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요. ',
  WINNING_NUMBER: '당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요. ',
  RESTART: `다시 시작하시겠습니까? (${StaticValue.RESTART_CONTROL}/${StaticValue.QUIT_CONTROL}) `,
});

const ResultMessage = Object.freeze({
  purchaseCount: (count) => `${count}개를 구매했습니다.`,
  RESULT: '당첨 통계\n--------------------',
  rank1: (number) => `6개 일치 (2,000,000,000원) - ${number}개`,
  rank2: (number) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${number}개`,
  rank3: (number) => `5개 일치 (1,500,000원) - ${number}개`,
  rank4: (number) => `4개 일치 (50,000원) - ${number}개`,
  rank5: (number) => `3개 일치 (5,000원) - ${number}개`,
  profitRateResult: (profitRate) => `총 수익률은 ${profitRate}%입니다.`,
});

const ErrorMessage = Object.freeze({
  MONEY_VALUE: `[ERROR] 로또 구입 금액은 ${StaticValue.PURCHASE_AMOUNT_UNIT}원 단위로 입력해 주세요.`,
  MINMUM_VALUE: `[ERROR] 로또 구입 금액은 ${StaticValue.PURCHASE_AMOUNT_UNIT}원 이상이여야 합니다.`,
  MONEY_INPUT_TYPE: '[ERROR] 로또 구입 금액은 숫자만 입력해 주세요.',
  LOTTO_VALUE: `[ERROR] 로또 번호는 ${StaticValue.LOTTO_LOWER_INCLUSIVE}~${StaticValue.LOTTO_UPPER_INCLUSIVE} 사이의 숫자를 입력해주세요.`,
  LOTTO_LENGTH: `[ERROR] 로또 당첨 번호 ${StaticValue.LOTTO_LENGTH}개를 입력해주세요.`,
  LOTTO_DUPLICATE: '[ERROR] 로또 번호는 중복되지 않게 입력해주세요.',
  BONUS_NUMBER_DUPLICATE: '[ERROR] 보너스 번호는 로또 번호와 중복되지 않게 입력해주세요.',
  BONUS_NUMBER_VALUE: `[ERROR] 보너스 번호는 ${StaticValue.LOTTO_LOWER_INCLUSIVE}~${StaticValue.LOTTO_UPPER_INCLUSIVE} 사이의 숫자를 입력해주세요.`,
  RESTART: `[ERROR] ${StaticValue.RESTART_CONTROL} 또는 ${StaticValue.QUIT_CONTROL}을 입력해주세요.`,
});

export { StaticValue, MatchCount, Rank, Prize, RequestMessage, ResultMessage, ErrorMessage };
