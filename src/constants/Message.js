const PREFIX = '[ERROR]';

const ERROR = {
  LOTTO_NUMBERS_LENGTH: `${PREFIX} 로또 번호는 6개여야 합니다.`,
  LOTTO_NUMBERS_NO_DUPLICATE: `${PREFIX} 로또 번호는 중복되어선 안 됩니다.`,
  LOTTO_NUMBERS_TYPE: `${PREFIX} 로또 번호는 전부 정수여야 합니다.`,
  LOTTO_NUMBERS_RANGE: `${PREFIX} 로또 번호는 전부 1에서 45 사이의 숫자여야 합니다.`,
};

export default {
  PREFIX,
  ERROR,
};
