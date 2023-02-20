import deepFreeze from '../utils/deepFreeze';

const MESSAGE = deepFreeze({
  INPUT: {
    MONEY: '> 구입금액을 입력해 주세요.',
    WINNING_NUMBER: '\n> 당첨 번호를 입력해 주세요.',
    BONUS_NUMBER: '\n> 보너스 번호를 입력해 주세요.',
    RESTART: '\n> 다시 시작하시겠습니까? (y/n)',
  },

  OUTPUT: {
    LOTTO_COUNT: '개를 구매했습니다.',
  },

  ERROR: {
    POSITIVE_INTEGER: '[ERROR] 숫자를 입력해주세요.',
    THOUSANDS_WON: '[ERROR] 1000원 단위의 금액을 입력해주세요.',
    VALID_SIX_NUMBER: '[ERROR] ,로 이루어진 여섯개의 1부터 45까지의 숫자를 입력해주세요',
    HAS_BLANK: '[ERROR] 공백을 제외하고 입력해주세요',
    IN_RANGE: '[ERROR] 1에서 45까지의 숫자를 입력해주세요.',
    Y_OR_N: '[ERROR] y 또는 n만 입력해주세요',
    NOT_SIX_LENGTH: '[ERROR] 6개의 숫자를 입력해주세요',
    OVERLAP: '[ERROR] 중복되는 숫자가 있습니다',
    OVERLAP_WINNING_NUM: '[ERROR] 당첨번호에 이미 있는 숫자입니다',
  },

  STATISTICS_MESSAGE: {
    OPENING: '\n당첨 통계\n--------------------',
    FIFTH: '3개 일치 (5,000원) - ',
    FOURTH: '4개 일치 (50,000원) - ',
    THIRD: '5개 일치 (1,500,000원) - ',
    SECOND: '5개 일치, 보너스 볼 일치 (30,000,000원) - ',
    FIRST: '6개 일치 (2,000,000,000원) - ',
  },
});

export default MESSAGE;
