import Condition from './Condition';

const { LOTTO } = Condition;

const PREFIX = '[ERROR]';

const ERROR = {
  LOTTO_NUMBERS_LENGTH: `${PREFIX} 로또 번호는 ${LOTTO.NUMBER_LENGTH}개여야 합니다.`,
  LOTTO_NUMBERS_NO_DUPLICATE: `${PREFIX} 로또 번호는 중복되어선 안 됩니다.`,
  LOTTO_NUMBERS_TYPE: `${PREFIX} 로또 번호는 전부 정수여야 합니다.`,
  LOTTO_NUMBERS_RANGE: `${PREFIX} 로또 번호는 전부 ${LOTTO.NUMBER_RANGE_MIN}에서 ${LOTTO.NUMBER_RANGE_MAX} 사이의 숫자여야 합니다.`,
};

export default {
  PREFIX,
  ERROR,
};
