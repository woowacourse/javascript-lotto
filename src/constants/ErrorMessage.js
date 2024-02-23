import Condition from './Condition';

const { LOTTO, MONEY, RESTART_OPTION } = Condition;
const PREFIX = '[ERROR]';

const ERROR = {
  LOTTO_NUMBERS_LENGTH: `${PREFIX} 로또 번호는 ${LOTTO.NUMBER_LENGTH}개여야 합니다.`,
  LOTTO_NUMBERS_NO_DUPLICATE: `${PREFIX} 로또 번호는 중복되어선 안 됩니다.`,
  LOTTO_NUMBERS_TYPE: `${PREFIX} 로또 번호는 전부 정수여야 합니다.`,
  LOTTO_NUMBERS_RANGE: `${PREFIX} 로또 번호는 전부 ${LOTTO.NUMBER_RANGE_MIN}에서 ${LOTTO.NUMBER_RANGE_MAX} 사이의 숫자여야 합니다.`,
  MONEY_TYPE: `${PREFIX} 구입 금액은 숫자여야 합니다.`,
  MONEY_MINIMUM: `${PREFIX} 구입 금액은 ${MONEY.MIN}보다 커야합니다.`,
  MONEY_UNIT: `${PREFIX} 구입 금액은 ${MONEY.UNIT}원 단위여야 합니다.`,
  OPTION_CHARACTER: `${PREFIX} 재시작/종료 여부는 ${RESTART_OPTION.RESTART} 또는 ${RESTART_OPTION.EXIT} 이어야 합니다.`,
};

export default ERROR;
