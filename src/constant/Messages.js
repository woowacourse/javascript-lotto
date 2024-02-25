/* eslint-disable max-params */
export const VARIABLE_ALIAS = {
  purchaseAmount: '구입 금액',
  lottoNumbers: '로또 번호'
};

export const INPUT_MESSAGES = {
  purchaseAmount: '> 구입금액을 입력해 주세요.\n',
  winningNumbers: '\n> 당첨 번호를 입력해 주세요.\n',
  bonusNumber: '\n> 보너스 번호를 입력해 주세요.\n',
  restartResponse: '\n> 다시 시작하시겠습니까? (y/n)\n'
};

export const OUTPUT_MESSAGES = {
  issueQuantity: (count) => `\n${count}개를 구매했습니다.`,
  lottoNumbers: (numbers) => `[${numbers.join(', ')}]`,
  statisticsTitle: '\n당첨 통계',
  dividingLine: '--------------------',
  statisticsResult: (matchingCount, bounusMatch, prizeAmount, count) =>
    `${matchingCount}개 일치${bounusMatch} (${prizeAmount}) - ${count}개`,
  bonusMatch: ', 보너스 볼 일치',
  profitRate: (profitRate) => `총 수익률은 ${profitRate}%입니다.`
};
