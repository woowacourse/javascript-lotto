import { COMMAND, LOTTO } from './setting';

export const ERROR_MESSAGE = {
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
