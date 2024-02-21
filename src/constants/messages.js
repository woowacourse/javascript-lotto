export const INPUT_MESSAGES = {
  prefix: '>',
  lottoPayment: '구입금액을 입력해 주세요.',
  winningNumbers: '당첨 번호를 입력해 주세요.',
  reStart: '다시 시작하시겠습니까? (y/n)',
};

export const OUTPUT_MESSAGES = {
  buyCount(count) {
    return `${count}개를 구매했습니다.`;
  },
  winningStatics: '당첨 통계',
  winningStaticsOperation: '--------------------',
  totalProfit(profit) {
    return `총 수익률은 ${profit}%입니다.`;
  },
};

export const ERROR_MESSAGES = {
  prefix: '[ERROR]',
  invalidDividedUnit: '구입 금액은 1000원 단위로 나누어 떨어져야 합니다.',
  invalidLength: '6개의 숫자를 입력해 주세요.',
  invalidRange: '1 ~ 45 사이의 숫자만 입력해 주세요.',
  duplicateNumber: '중복된 숫자는 입력할 수 없습니다.',
  invalidBonusNumber: '보너스 번호는 당첨 번호와 중복되면 안됩니다.',
};
