import Condition from './Condition';

const { LOTTO, MONEY, RESTART_OPTION } = Condition;

const PREFIX = '[ERROR]';

const ERROR = {
  LOTTO_NUMBERS_LENGTH: `${PREFIX} 로또 번호는 ${LOTTO.NUMBER_LENGTH}개여야 합니다.`,
  LOTTO_NUMBERS_NO_DUPLICATE: `${PREFIX} 로또 번호는 중복되어선 안 됩니다.`,
  LOTTO_NUMBERS_TYPE: `${PREFIX} 로또 번호는 전부 정수여야 합니다.`,
  LOTTO_NUMBERS_RANGE: `${PREFIX} 로또 번호는 전부 ${LOTTO.NUMBER_RANGE_MIN}에서 ${LOTTO.NUMBER_RANGE_MAX} 사이의 숫자여야 합니다.`,
  MONEY_TYPE: `${PREFIX} 구입 금액은 숫자여야 합니다.`,
  MONEY_RANGE: `${PREFIX} 구입 금액은 ${MONEY.MIN}보다 크고 ${MONEY.MAX} 이하여야 합니다.`,
  MONEY_UNIT: `${PREFIX} 구입 금액은 ${MONEY.UNIT}원 단위여야 합니다`,
  OPTION_CHARACTER: `${PREFIX} 재시작/종료 여부는 ${RESTART_OPTION.RESTART} 또는 ${RESTART_OPTION.EXIT} 이어야 합니다.`,
};

const INPUT = {
  MONEY: '구입 금액을 입력해 주세요. ',
  WINNING_NUMBERS: '당첨 번호를 입력해 주세요. ',
  BONUS_NUMBER: '\n보너스 번호를 입력해 주세요. ',
  RESTART_OR_EXIT: '다시 시작하시겠습니까? (y/n) ',
};

const OUTPUT = {
  LOTTO_TICKETS_COUNT: `개를 구매했습니다.`,
  PRIZE_STATISTICS_HEADER: '당첨 통계',
  PRIZE_STATISTICS_SEPARATOR: '--------------------',
  NEW_LINE: '',
  RETURN_ON_INVESTMENT_HEADER: '총 수익률은',
  RETURN_ON_INVESTMENT_FOOTER: '%입니다.',
};

export default {
  PREFIX,
  ERROR,
  INPUT,
  OUTPUT,
};
