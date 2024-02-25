export const VARIABLE_ALIAS = {
  purchaseAmount: '구입 금액',
  lottoNumbers: '당첨 번호',
  bonusNumber: '보너스 번호',
  restartVar: '재시작'
};

export const ERROR_MESSAGES = {
  prefix: '[ERROR] ',
  isNotInteger: (name) => `${name}(은)는 정수 값이어야 합니다.`,
  isNotAtLeast: (name, threshold) => `${name}(은)는 ${threshold} 이상이어야 합니다.`,
  hasNotLength: (name, length) => `${name}의 길이는 ${length}이어야 합니다.`,
  isNotInRange: ({ name, min, max }) =>
    `${name}(은)는 [${min} ~ ${max}] 범위 이내의 값이어야 합니다.`,
  isNotUnique: (name) => `${name}(은)는 중복된 요소를 갖지 않아야 합니다.`,
  isNotRestart: (name, arr) => `${name} 옵션은 [ ${arr} ]에서 선택해야 합니다.`
};

export const INPUT_MESSAGES = {
  purchaseAmount: '\n> 구입금액을 입력해 주세요. ',
  winningNumbers: '\n> 당첨 번호를 입력해 주세요. ',
  bonusNumber: '\n> 보너스 번호를 입력해 주세요. ',
  restartResponse: '\n> 다시 시작하시겠습니까? (y/n) '
};

export const INPUT_HINTS = {
  purchaseAmount: '  [hint] 1000 이상의 금액을 입력하세요.\n',
  winningNumber1: '  [hint] 1부터 45 사이의 정수 6개를 ,(comma)로 구분하여 입력하세요.',
  winningNumber2: '  [hint] 중복은 허용하지 않습니다.\n',
  bonusNumber: '  [hint] 1부터 45 사이의 정수 1개를 입력하세요.\n'
};

export const OUTPUT_MESSAGES = {
  issueQuantity: (count) => `\n${count}개를 구매했습니다.`,
  lottoNumbers: (numbers) => `[${numbers.join(', ')}]`,
  statisticsTitle: '\n당첨 통계',
  dividingLine: '--------------------',
  statisticsResult: ({ matchingCount, bonusMatch, prizeAmount, count }) =>
    `${matchingCount}개 일치${bonusMatch} (${prizeAmount}원) - ${count}개`,
  bonusMatch: ', 보너스 볼 일치',
  profitRate: (profitRate) => `\n총 수익률은 ${profitRate}%입니다.`
};
