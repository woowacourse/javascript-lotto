import WINNER from './winner';

const ERROR_MESSAGE = Object.freeze({
  PREFIX: '[ERROR]',
  NUMBERS_RANGE: '허용된 정수 범위를 벗어났습니다.',
  NUMBERS_LENGTH: '6개의 정수를 입력하셔야 합니다.',
  NUMBERS_DUPLICATION: '중복된 숫자가 있습니다.',
  PURCHASE_AMOUNT: '유효한 구입 금액이 아닙니다.',
  RESTART_RESPONSE: '유효한 응답이 아닙니다. y/n으로 응답해 주세요.',
});

const QUERY_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
  WIN_NUMBERS: NEW_LINE + '> 당첨번호를 입력해 주세요.',
  BONUS_NUMBER: NEW_LINE + '> 보너스 번호를 입력해 주세요.',
  RESTART: NEW_LINE + '> 다시 시작하시겠습니까? (y/n)',
});

const NEW_LINE = '\n';

const OUTPUT_MESSAGE = Object.freeze({
  LOTTO_PURCHASED: (count) => NEW_LINE + `${count}개를 구매했습니다.`,
  WINNING_STATISTICS_TITLE: NEW_LINE + `당첨 통계` + NEW_LINE + `--------------------`,
  MATCH_COUNT: (prizeNumber) => `${WINNER[prizeNumber].MATCH_COUNT}개 일치`,
  BONUS_MATCH: `, 보너스 볼 일치`,
  WIN_PRICE: (prizeNumber) => `(${WINNER[prizeNumber].PRICE})원)`,
  WIN_COUNT: (count) => ` - ${count}개`,
  RATE_OF_REVENUE: (result) => `총 수익률은 ${result}%입니다.`,
  EMPTY: ``,
});

export { ERROR_MESSAGE, QUERY_MESSAGE, OUTPUT_MESSAGE };
