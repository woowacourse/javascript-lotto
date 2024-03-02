import LOTTO_RULES from './lotto-rules.js';

export const INPUT_MESSAGES = {
  prefix: '>',
  lottoPurchasePrice: '구입금액을 입력해 주세요.',
  winningNumbers: '당첨 번호를 입력해 주세요.',
  bonusNumber: '보너스 번호를 입력해 주세요.',
  restart: '다시 시작하시겠습니까? (y/n)',
};

export const OUTPUT_MESSAGES = {
  ticketCount(count) {
    return `${count}개를 구매했습니다.`;
  },
  winningStatistics: '당첨 통계',
  winningStatisticsOperation: '--------------------',
  totalProfit(profit) {
    return `총 수익률은 ${profit}%입니다.`;
  },
};

export const ERROR_MESSAGES = {
  prefix: '[ERROR]',
  invalidDividedUnit: `구입 금액은 ${LOTTO_RULES.lottoBaseTicketPrice}원 단위로 나누어 떨어져야 합니다.`,
  invalidLength: `${LOTTO_RULES.winningNumbersLength}개의 숫자를 입력해 주세요.`,
  invalidRange: `${LOTTO_RULES.minLength} ~ ${LOTTO_RULES.maxLength} 사이의 숫자만 입력해 주세요.`,
  invalidUniqueNumber: '중복된 숫자는 입력할 수 없습니다.',
};

export const WEB_MESSAGES = {
  ticketEmoji: '🎟️',
  ticketCount(count) {
    return `총 ${count}개를 구매했습니다.`;
  },
  totalProfit(profit) {
    return `당신의 총 수익률은 ${profit}%입니다.`;
  },
};
