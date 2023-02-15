const StaticValue = {
  PURCHASE_AMOUNT_UNIT: 1000,
  REGEX_NON_DIGIT: /\D|^$/,
};

const ConsoleMessage = {
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요. ",
  purchaseCount: (count) => `${count}개를 구매했습니다.`,
  WINNING_NUMBER: "당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요. ",
};

const ErrorMessage = {
  MONEY_VALUE: "[ERROR] 로또 구입 금액은 1000원 단위로 입력해 주세요.",
  MINMUM_VALUE: "[ERROR] 로또 구입 금액은 1000원 이상이여야 합니다.",
  MONEY_INPUT_TYPE: "[ERROR] 로또 구입 금액은 숫자만 입력해 주세요.",
  LOTTO_VALUE: "[ERROR] 로또 번호는 1~45 사이의 숫자를 입력해주세요.",
  LOTTO_LENGTH: "[ERROR] 로또 당첨 번호 6개를 입력해주세요.",
  LOTTO_DUPLICATE: "[ERROR] 로또 번호는 중복되지 않게 입력해주세요.",
  BONUS_NUMBER_DUPLICATE:
    "[ERROR] 보너스 번호는 로또 번호와 중복되지 않게 입력해주세요.",
  BONUS_NUMBER_VALUE: "[ERROR] 보너스 번호는 1~45 사이의 숫자를 입력해주세요.",
};

const Rank = Object.freeze({
  0: 6,
  1: 6,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  5.5: 2,
  6: 1,
});

const Prize = Object.freeze({
  1: 2_000_000_000,
  2: 30_000_000,
  3: 1_500_000,
  4: 50_000,
  5: 5000,
  6: 0,
});

export { StaticValue, ConsoleMessage, ErrorMessage, Rank, Prize };
