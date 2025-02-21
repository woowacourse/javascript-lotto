const Constants = Object.freeze({
  LOTTO: {
    UNIT: 1000,
    NUMBER_LENGTH: 6,
    MAX_NUMBER: 45,
    MIN_NUMBER: 1,
    CORRECT_NUMBER: {
      FIRST: 6,
      SECOND: 5,
      THIRD: 5,
      FOURTH: 4,
      FIFTH: 3,
    },
    PRIZE: {
      FIFTH: 5_000,
      FOURTH: 50_000,
      THIRD: 1_500_000,
      SECOND: 30_000_000,
      FIRST: 2_000_000_000,
    },
  },
  OPERATOR: {
    SEPARATOR: ",",
  },
  MESSAGE: {
    PRICE: "> 구입금액을 입력해 주세요.",
    TARGET_NUMBER: "> 당첨 번호를 입력해 주세요.",
    BONUS_NUMBER: "> 보너스 번호를 입력해 주세요.",
    RESTART_STRING: "> 다시 시작하시겠습니까? (y/n) ",
  },
  ERROR: {
    PRICE_TYPE: "[ERROR] 금액은 숫자로 입력해야 한다.",
    PRICE_UNIT: "[ERROR] 금액은 1,000원으로 나누어 떨어져야 한다.",
    TARGET_NUMBER_LENGTH: "[ERROR] 당첨번호는 쉼표로 구분되어야 한다.",
    LOTTO_NUMBER_RANGE: "[ERROR] 당첨번호는 1~45 사이의 숫자이어야한다.",
    BONUS_NUMBER_TYPE: "[ERROR] 보너스 번호는 숫자이어야 한다.",
    BONUS_NUMBER_RANGE: "[ERROR] 보너스 번호의 범위는 1~45이어야한다.",
    BONUS_NUMBER_DUPLICATE: "[ERROR] 보너스 번호는 당첨번호와 중복될수 없다.",
    RESTART_STRING: "[ERROR] 다시 시작하기 위한 입력은 y또는 n이어야 한다.",
  },
});

export default Constants;
