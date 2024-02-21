export const VARIABLE_ALIAS = {
  purchaseAmount: '구입 금액'
};

export const ERROR_MESSAGE = {
  prefix: '[ERROR] ',
  isNotInteger: (name) => `${name}(은)는 정수 값이어야 합니다.`,
  isNotAtLeast: (name, threshold) =>
    `${name}(은)는 ${threshold} 이상이어야 합니다.`
};
