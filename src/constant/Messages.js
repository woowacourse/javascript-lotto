const Messages = {
  BONUS_NUMBER_REWARD_NAME: '{0}개 일치, 보너스 볼 일치',
  REWARD_NAME: '{0}개 일치',

  INPUT_MONEY: '구입 금액을 입력해 주세요.',
  INPUT_WINNING_NUMBERS: '당첨 번호를 입력해 주세요.',
  INPUT_BONUS_NUIMBER: '보너스 번호를 입력해 주세요.',
  INPUT_RESTART_COMMAND: '다시 시작하시겠습니까? (y/n)',

  PRINT_BOUGHT_LOTTOS_COUNT: '{0}개를 구매했습니다.',
  PRINT_BOUGHT_LOTTO: '[{0}]',
  PRINT_LOTTO_RESULT_TITLE: '당첨 통계',
  PRINT_LOTTO_RESULT_SUBTITLE: '★-★-★-★-★-★',
  PRINT_LOTTO_RESULT_REWARD: '{0} ({1}원) - {2}개',
  PRINT_PROFIT_RATE: '총 수익률은 {0}% 입니다.',
  PRINT_EXIT: '게임이 종료되었습니다.',

  ERROR_MONEY_SHOULD_POSITIVE_INTEGER: '로또 구매 금액은 0 이상의 정수를 입력해야 합니다.',
  ERROR_MONEY_AMOUNT_SHOULD_MULTIPLE_OF: '{0}원 단위로 금액을 주어야 합니다.',
  ERROR_LOTTO_NUMBER_SHOULD_NUMERIC: '로또 번호는 숫자로 이루어져 있어야 합니다.',
  ERROR_LOTTO_NUMBER_SHOULD_BETWEEN: '로또 번호는 {0}에서 {1} 사이의 숫자여야 합니다.',
  ERROR_LOTTO_NUMBERS_SHOULD_ARRAY: '로또 번호는 배열 타입이어야 합니다.',
  ERROR_LOTTO_NUMBERS_SHOULD_LENGTH_OF: '로또 번호는 {0}자리여야 합니다.',
  ERROR_LOTTO_NUMBERS_SHOULD_UNIQUE: '로또 번호는 중복될 수 없습니다.',
  ERROR_BONUS_NUMBER_SHOULD_UNIQUE: '로또 번호와 보너스 번호는 중복될 수 없습니다.',
  ERROR_RESTART_COMMAND_SHOULD_BE: '재시작 명령어는 y또는 n으로 입력해야 합니다.',

  format(message, ...args) {
    return args.reduce(
      (formattedMessage, arg, index) => formattedMessage.replaceAll(`{${index}}`, arg),
      message,
    );
  },
};

export default Messages;
