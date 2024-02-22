import { NUMBER_DELIMITER } from './delimiters';
import { LOTTO_RULE, RESTART_KEY } from './rules';

const INPUT_QUERY_PREFIX = '> ';

export const INPUT_MESSAGES = Object.freeze({
  paymentAmount: `\n${INPUT_QUERY_PREFIX}구입금액을 입력해 주세요.\n`,
  winningLottoNumbers: `\n${INPUT_QUERY_PREFIX}당첨 번호를 입력해 주세요.\n`,
  bonusNumber: `\n${INPUT_QUERY_PREFIX}보너스 번호를 입력해 주세요.\n`,
  restart: `\n${INPUT_QUERY_PREFIX}다시 시작하시겠습니까? (${RESTART_KEY.restart}/${RESTART_KEY.end})\n`,
});

export const OUTPUT_MESSAGES = Object.freeze({
  lottoTickets: '\n당첨 통계',
  divider: '--------------------',
  moneyUnit: '원',
  countUnit: '개',
  profitUnit: '%',
  restartGame: '\n---게임 재시작!🎮---\n',
  endGame: '\n 게임 종료 👏👏👏',
});

const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES = Object.freeze({
  isUndefinedInputValue: `${ERROR_PREFIX} 입력값이 없습니다.`,
  inValidWInningNumbersForm: `${ERROR_PREFIX} 당첨 번호 숫자를 쉼표("${NUMBER_DELIMITER}")로 구분하여 입력해 주세요.\n`,
  alreadyInLottoNumber: `${ERROR_PREFIX} 보너스 번호는 당첨 번호에 없는 번호여야 합니다.\n`,
  notInteger: `${ERROR_PREFIX} 정수가 아닙니다.\n`,
  inDivisibleByPrice: `${ERROR_PREFIX} 구매 금액이 ${LOTTO_RULE.price.toLocaleString('ko-KR')}${OUTPUT_MESSAGES.moneyUnit} 단위가 아닙니다.\n`,
  inValidNumbersOfTickets: `${ERROR_PREFIX} 로또 티켓은 ${LOTTO_RULE.numbersOfTickets.min}장 이상 ${LOTTO_RULE.numbersOfTickets.max}이하로 구매하실 수  있습니다.\n`,
  invalidLottoNumberCount: `${ERROR_PREFIX} 로또 번호 개수는 ${LOTTO_RULE.length}개 여야 합니다.\n`,
  duplicatedLottoNumber: `${ERROR_PREFIX} 로또 번호는 중복될 수 없습니다.\n`,
  invalidLottoNumberRange: `${ERROR_PREFIX} 번호는 ${LOTTO_RULE.range.start} 이상 ${LOTTO_RULE.range.end} 이하의 숫자로 이루어져야합니다.\n`,
  invalidRestartInputForm: `${ERROR_PREFIX} ${RESTART_KEY.restart} 또는 ${RESTART_KEY.end}로 입력해 주세요.\n`,
});
