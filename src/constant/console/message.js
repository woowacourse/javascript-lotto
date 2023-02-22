import { LOTTO, RANK, COMMAND } from '../setting';

const INPUT_MESSAGE = {
  PURCHASE_AMOUNT: '> 구입금액을 입력해 주세요.',
  WINNING_NUMBER: '> 당첨 번호를 입력해 주세요.',
  BONUS_NUMBER: '> 보너스 번호를 입력해 주세요.',
  RESTART_COMMAND: `> 다시 시작하시겠습니까? (${COMMAND.YES}/${COMMAND.NO})`,
};

const OUTPUT_MESSAGE = {
  WINNING_STATISTICS_HEADER: '당첨 통계\n' + '--------------------',
};

const OUTPUT_MESSAGE_METHOD = {
  PURCHASE_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  RANK: (rank, count) =>
    `${RANK[rank].MATCH_COUNT}개 일치${rank === RANK.SECOND.NAME ? ', 보너스 볼 일치' : ''} (${RANK[
      rank
    ].REWARDS.toLocaleString()}원) - ${count}개`,
  PROFIT_RATE: (rate) =>
    `총 수익률은 ${rate.toLocaleString(undefined, { minimumFractionDigits: 1 })}%입니다.`,
};

const ERROR_MESSAGE = {
  PREFIX: '[ERROR] ',
  LESS_THAN_MINIMUM: `구입 금액은 ${LOTTO.UNIT.toLocaleString()}원 이상이어야 합니다.`,
  HAS_CHANGE: `구입 금액은 ${LOTTO.UNIT.toLocaleString()}원 단위이어야 합니다.`,
  OUT_OF_RANGE: `${LOTTO.MIN_NUMBER_RANGE}~${LOTTO.MAX_NUMBER_RANGE}사이의 숫자이어야 합니다.`,
  INVALID_LOTTO_SIZE: `당첨 번호는 ${LOTTO.SIZE}개의 숫자로 이루어져야 합니다.`,
  DUPLICATED_NUMBER: '중복된 번호가 포함되어 있습니다.',
  INCLUDES_WINNING_NUMBER: '당첨 번호와 중복된 번호입니다.',
  INVALID_RESTART_COMMAND: `재시작 명령어는 ${COMMAND.YES}또는 ${COMMAND.NO}이어야 합니다.`,
  EMPTY_INPUT: '빈값을 입력하였습니다.',
  HAS_BLANK: '공백이 포함되어 있습니다.',
  NOT_A_NUMBER: '입력한 값이 숫자가 아닙니다.',
};

export { INPUT_MESSAGE, OUTPUT_MESSAGE, OUTPUT_MESSAGE_METHOD, ERROR_MESSAGE };
