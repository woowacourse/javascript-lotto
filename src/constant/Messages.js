export const VARIABLE_ALIAS = {
  purchaseAmount: '구입 금액',
  lottoNumbers: '로또 번호'
};

export const ERROR_MESSAGES = {
  prefix: '[ERROR] ',
  isNotInteger: (name) => `${name}(은)는 정수 값이어야 합니다.`,
  isNotAtLeast: (name, threshold) => `${name}(은)는 ${threshold} 이상이어야 합니다.`,
  hasNotLength: (name, length) => `${name}의 길이는 ${length}이어야 합니다.`,
  isNotInRange: (name, min, max) => `${name}(은)는 [${min} ~ ${max}] 범위 이내의 값이어야 합니다.`,
  isNotUnique: (name) => `${name}(은)는 중복된 요소를 갖지 않아야 합니다.`
};

export const INPUT_MESSAGES = {
  purchaseAmount: '> 구입금액을 입력해 주세요. ',
  winningNumbers: '> 당첨 번호를 입력해 주세요. ',
  bonusNumber: '> 보너스 번호를 입력해 주세요. ',
  restartResponse: '> 다시 시작하시겠습니까? (y/n) '
};

export const INPUT_HINTS = {
  purchaseAmount: '\t[hint] 1000 이상의 금액을 입력하세요.',
  winningNumber1: '\t[hint] 1부터 45 사이의 정수 6개를 ,(comma)로 구분하여 입력하세요.',
  winningNumber2: '\t[hint] 중복은 허용하지 않습니다. ',
  bonusNumber: '\t[hint] 1부터 45 사이의 정수 1개를 입력하세요.'
};
