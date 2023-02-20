export const ERROR = Object.freeze({
  LOTTO_NUMBER_LENGTH: '[ERROR] 로또 번호는 6자리로 입력해야 합니다.',
  LOTTO_NUMBER_DUPLICATED: '[ERROR] 로또 번호는 서로 중복되지 않는 값이어야 합니다.',
  LOTTO_NUMBER_RANGE: '[ERROR] 로또 번호는 1~45 사이의 숫자여야 합니다.',
  BONUS_NUMBER_DUPLICATED: '[ERROR] 보너스 번호는 로또 번호와 중복되지 않아야 합니다.',
  BONUS_NUMBER_RANGE: '[ERROR] 보너스 번호는 1~45 사이의 숫자여야 합니다.',
  NUMBER_TYPE: '[ERROR] 입력 값은 숫자여야 합니다.',
  RETRY_COMMAND: '[ERROR] y, n중에 명령어를 입력해야 합니다.',
});

export const ERROR_METHOD = Object.freeze({
  EXACT_UNIT: (unit) => `[ERROR] 입력 값은 ${unit} 단위여야 합니다.`,
});

export const COMMAND = Object.freeze({
  RETRY: 'y',
  CLOSE: 'n',
});

export const MESSAGE = Object.freeze({
  REQUEST_PURCHASE_MONEY: '구입 금액을 입력 해 주세요.',
  REQUEST_LOTTO_NUMBERS: '\n당첨 번호를 입력해 주세요.',
  REQUEST_BONUSE_NUMBER: '보너스 번호를 입력해 주세요.',
  REQUEST_RETRY_COMMAND: '\n다시 시작하시겠습니까? (y/n)',
});

export const MESSAGE_METHOD = Object.freeze({
  PURCHASED_LOTTO_COUNT: (count) => `${count}개를 구매했습니다.`,
  PURCHASED_LOTTO: (lotto) => `[${lotto.getLottoNumber().join(', ')}]`,
  WINNING_RANK_RESULT: (rankResult) =>
    `\n당첨 통계\n--------------------\n3개 일치 (5,000원) - ${rankResult[5]}\n4개 일치 (50,000원) - ${rankResult[4]}\n5개 일치 (1,500,000원) - ${rankResult[3]}\n5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankResult[2]}\n6개 일치 (2,000,000,000원) - ${rankResult[1]}`,
  PROFIT_RATE: (parsedRate) => `총 수익률은 ${parsedRate}%입니다.`,
});

export const PRIZE = Object.freeze({
  NONE: 0,
  FIRST: 2_000_000_000,
  SECOND: 30_000_000,
  THIRD: 1_500_000,
  FORTH: 50_000,
  FIFTH: 5_000,
});

export const LOTTO_PRICE = 1000;

export const LOTTO_NUMBER = Object.freeze({
  MIN: 1,
  MAX: 45,
  LENGTH: 6,
});

export const RANK_INDEX = Object.freeze({
  NONE: 0,
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FORTH: 4,
  FIFTH: 5,
});
