export const VARIABLE_ALIAS = {
  purchaseAmount: '구입 금액',
  lottoNumbers: '로또 번호'
};

export const ERROR_MESSAGE = {
  prefix: '[ERROR] ',
  isNotInteger: (name) => `${name}(은)는 정수 값이어야 합니다.`,
  isNotAtLeast: (name, threshold) =>
    `${name}(은)는 ${threshold} 이상이어야 합니다.`,
  hasNotLength: (name, length) => `${name}의 길이는 ${length}이어야 합니다.`,
  isNotInRange: (name, min, max) =>
    `${name}(은)는 [${min} ~ ${max}] 범위 이내의 값이어야 합니다.`,
  isNotUnique: (name) => `${name}(은)는 중복된 요소를 갖지 않아야 합니다.`
};
