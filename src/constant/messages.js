import { LOTTO_RULES, SYMBOL } from './constants.js';

export const INPUT_MESSAGES = {
  cost: `${SYMBOL.input_prefix} 구입 금액을 입력해주세요.`,
  winningNumber: `${SYMBOL.input_prefix} 당첨 번호를 입력해주세요.`,
  bonusNumber: `${SYMBOL.input_prefix} 보너스 번호를 입력해주세요.`,
  restart: `${SYMBOL.input_prefix} 다시 시작하시겠습니까? (${LOTTO_RULES.restart}, ${LOTTO_RULES.stop})`,
};

export const OUTPUT_MESSAGES = {
  buyCount: (count) => `${count}개를 구매했습니다.\n`,
  lotto: (lotto) => `[${lotto.join(`${SYMBOL.delimiter + SYMBOL.space}`)}]`,
  winningStatistics: '당첨 통계',
  separate: '--------------------',
  three: (three) => `3개 일치, (5,000원) - ${three}개`,
  four: (four) => `4개 일치, (50,000원) - ${four}개`,
  five: (five) => `5개 일치, (1,500,000원) - ${five}개`,
  five_bonus: (five) => `5개 일치, 보너스 . 볼일치 (30,000,000원) - ${five}개`,
  six: (six) => `6개 일치, (2,000,000,000원) - ${six}개`,
  profit: (profit) => `총 수익률은 ${profit}% 입니다.`,
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
