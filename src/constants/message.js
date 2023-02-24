import { LOTTO_CONDITION, COMMAND } from './condition.js';

const REQUEST_MESSAGE = Object.freeze({
  purchaseAmount: '구입금액을 입력해 주세요.\n',
  winningNumbers: '당첨 번호를 입력해 주세요.\n',
  bonusNumber: '보너스 번호를 입력해 주세요.\n',
  restartCommand: `다시 시작하시겠습니까? ( ${COMMAND.restart}/${COMMAND.quit})\n`,
});

const ERROR_MESSAGE = Object.freeze({
  emptyInput: '[ERROR] 입력값이 비었습니다. 값을 입력해주세요',
  invalidInputType: '[ERROR] 숫자 외의 문자를 입력할 수 없습니다.',
  lowerThanLottoPrice:
    `[ERROR] 로또 1장 가격(${LOTTO_CONDITION.lottoPrice.toLocaleString('ko-KR')}원) ` +
    '미만의 금액을 입력 하셨습니다.',
  indivisibleByLottoPrice:
    `[ERROR] 입력값이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice.toLocaleString('ko-KR')}원)` +
    '으로 나누어 떨어지지 않습니다.',
  invalidLottoNumberLength: `[ERROR] 로또 번호는 ${LOTTO_CONDITION.lottoDigits}개여야 합니다.`,
  invalidLottoNumberRange: `[ERROR] 로또 번호의 범위는 ${LOTTO_CONDITION.lottoNumberMinRange} ~ ${LOTTO_CONDITION.lottoNumberMaxRange} 입니다.`,
  duplicateLottoNumber: '[ERROR] 로또 번호에(와) 중복된 숫자가 있습니다.',
  invalidRestartCommand: `[ERROR] 재시작 커맨드는 ${COMMAND.restart} 또는 ${COMMAND.quit} 입니다.`,
});

export { REQUEST_MESSAGE, ERROR_MESSAGE };
