export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_LENGTH = 6;
export const LOTTO_PRICE = 1_000;
export const SEPERATOR = ',';
export const NO_WINNING = '당첨 없음';
export const COMMAND = {
  yes: 'y',
  no: 'n',
};
export const ERROR_MESSAGES_DEFAULT = '[ERROR]';
export const LOTTO_NUMBER_LENGTH = 6;
export const BONUS_NUMBER_LENGTH = 1;

export const appendErrorPrefix = (message) => `${ERROR_MESSAGES_DEFAULT} ${message}`;

export const ERROR_MESSAGES = {
  purchaseAmount: {
    positiveInteger: appendErrorPrefix('양의 정수를 입력해주세요.'),
    thousandUnit: appendErrorPrefix(`${LOTTO_PRICE.toLocaleString()}단위로 입력해주세요.`),
  },
  winNumber: {
    unique: appendErrorPrefix('중복되지 않은 숫자로 입력해주세요.'),
    range: appendErrorPrefix(
      `${LOTTO_NUMBER_LENGTH}개의 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 정수로 입력해주세요.`,
    ),
  },
  bonusNumber: {
    unique: appendErrorPrefix('당첨 번호와 중복되지 않게 입력해주세요.'),
    range: appendErrorPrefix(
      `${BONUS_NUMBER_LENGTH}개의 ${MIN_LOTTO_NUMBER}~${MAX_LOTTO_NUMBER} 사이의 정수로 입력해주세요.`,
    ),
  },
  retry: {
    yesOrNo: appendErrorPrefix(`${COMMAND.yes} 또는 ${COMMAND.no}을 입력해주세요.`),
  },
};

export const INPUT_MESSAGES = {
  purchaseAmount: () => '구입금액을 입력해 주세요.',
  winNumber: () => '당첨 번호를 입력해 주세요.',
  bonusNumber: () => '보너스 번호를 입력해 주세요.',
  retry: () => '다시 시작하시겠습니까? (y/n)',
};

export const OUTPUT_MESSAGES = {
  purchaseCount: (count) => `${count}개를 구매했습니다.`,
  statistics: () => '당첨 통계',
  divider: () => '------------',
};

export const LOTTO_RANK = {
  1: { winNumber: 6, isBonusNumberRequired: false, prize: 2_000_000_000 },
  2: { winNumber: 5, isBonusNumberRequired: true, prize: 30_000_000 },
  3: { winNumber: 5, isBonusNumberRequired: false, prize: 1_500_000 },
  4: { winNumber: 4, isBonusNumberRequired: false, prize: 50_000 },
  5: { winNumber: 3, isBonusNumberRequired: false, prize: 5_000 },
};
