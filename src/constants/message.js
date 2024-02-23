import { addPriceComma } from '../util/NumberHelper';

const ERROR_MESSAGE = Object.freeze({
  PREFIX: '[ERROR]',
  NUMBERS_RANGE: '허용된 정수 범위를 벗어났습니다.',
  NUMBERS_LENGTH: '6개의 정수를 입력하셔야 합니다.',
  NUMBERS_DUPLICATION: '중복된 숫자가 있습니다.',
  BONUS_DUPLICATION: '보너스 숫자가 우승 숫자들과 중복됩니다.',
  PURCHASE_AMOUNT: '유효한 구입 금액이 아닙니다.',
  RESTART_RESPONSE: '유효한 응답이 아닙니다. y/n으로 응답해 주세요.',
});

const QUERY_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
  WIN_NUMBERS: `> 당첨번호를 입력해 주세요.`,
  BONUS_NUMBER: '> 보너스 번호를 입력해 주세요.',
  RESTART: '> 다시 시작하시겠습니까? (y/n)',
});

const NEW_LINE = '\n';

const OUTPUT_MESSAGE = Object.freeze({
  LOTTO_PURCHASED: (count) => `${count}개를 구매했습니다.`,
  WINNING_STATISTICS_TITLE: `당첨 통계` + NEW_LINE + `--------------------`,
  MATCH_COUNT: (matchCount) => `${matchCount}개 일치`,
  BONUS_MATCH: `, 보너스 볼 일치`,
  WIN_PRICE: (price) => `(${addPriceComma(price)})원)`,
  WIN_COUNT: (count) => ` - ${count}개`,
  RATE_OF_REVENUE: (result) => `총 수익률은 ${result}%입니다.`,
  EMPTY: ``,
});

export { ERROR_MESSAGE, QUERY_MESSAGE, OUTPUT_MESSAGE };
