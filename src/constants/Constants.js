const StaticValue = {
  PURCHASE_AMOUNT_UNIT: 1000,
  REGEX_NON_DIGIT: /\D|^$/,
};

const ConsoleMessage = {
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
};

const ErrorMessage = {
  MONEY_VALUE: '[ERROR] 로또 구입 금액은 1000원 단위로 입력해 주세요.',
  MINMUM_VALUE: '[ERROR] 로또 구입 금액은 1000원 이상이여야 합니다.',
  MONEY_INPUT_TYPE: '[ERROR] 로또 구입 금액은 숫자만 입력해 주세요.'
}

export { StaticValue, ConsoleMessage, ErrorMessage };