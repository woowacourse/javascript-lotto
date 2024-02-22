export const CONSTANTS = {
  zero: 0,
  one: 1,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  hundred: 100,
  yes: 'y',
  no: 'n',
  comma: ',',
};

export const REGEXP = {
  numericPattern: /^\d+$/,
};

export const PRIZE = {
  first: 2_000_000_000,
  second: 30_000_000,
  third: 1_500_000,
  fourth: 50_000,
  fifth: 5_000,
};

export const LOTTO_RULES = {
  length: 6,
  min_number: 1,
  max_number: 45,
  cost: 1_000,
};

export const ERROR_MESSAGES = {
  incorrect_length: `로또의 개수가 ${LOTTO_RULES.length}이 아닙니다.`,
  duplicate: '로또 번호는 중복되어선 안됩니다.',
  lotto_number_range: `로또 번호는 ${LOTTO_RULES.min_number}에서 ${LOTTO_RULES.max_number}사이여야 합니다.`,
  bonus_number_duplicate: '보너스 번호는 당첨번호와 중복되지 않아야 합니다.',
  positiveInteger: '양의 정수를 입력해주세요',
  divideThousand: '1,000원 단위로 입력가능합니다.',
  greaterThanThousand: '1000원 이상의 금액을 입력해주세요.',
  only_y_or_n: 'y 또는 n만 입력 가능합니다.',
};

export const INPUT_MESSAGES = {
  cost: '> 구입 금액을 입력해주세요.',
  winningNumber: '> 당첨 번호를 입력해주세요.',
  bonusNumber: '> 보너스 번호를 입력해주세요.',
  restart: '> 다시 시작하시겠습니까? (y, n)',
};

export const OUTPUT_MESSAGES = {
  buyCount: (count) => `${count}개를 구매했습니다.\n`,
  lotto: (lotto) => `[${lotto.join(', ')}]`,
  winningStatistics: '당첨 통계',
  separate: '--------------------',
  three: (three) => `3개 일치, (5,000원) - ${three}개`,
  four: (four) => `4개 일치, (50,000원) - ${four}개`,
  five: (five) => `5개 일치, (1,500,000원) - ${five}개`,
  five_bonus: (five) => `5개 일치, 보너스 . 볼일치 (30,000,000원) - ${five}개`,
  six: (six) => `6개 일치, (2,000,000,000원) - ${six}개`,
  profit: (profit) => `총 수익률은 ${profit}% 입니다.`,
};
