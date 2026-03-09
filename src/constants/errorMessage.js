const ERROR_MESSAGE = {
  AMOUNT: {
    POSITIVE: "구입 금액은 양수여야 합니다.",
    UNIT: "구입 금액은 1,000원 단위여야 합니다.",
  },

  LOTTO: {
    INTEGER: "로또 번호는 정수여야 합니다.",
    RANGE: "로또 번호는 1부터 45 사이여야 합니다.",
    DUPLICATE: "로또 번호는 중복될 수 없습니다.",
  },

  WINNING_NUMBERS: {
    NUMBER: "당첨 번호는 숫자여야 합니다.",
    INTEGER: "당첨 번호는 정수여야 합니다.",
    RANGE: "당첨 번호는 1부터 45 사이여야 합니다.",
    DUPLICATE: "당첨 번호는 중복될 수 없습니다.",
    LENGTH: "당첨 번호는 6개여야 합니다.",
  },

  BONUS_NUMBER: {
    NUMBER: "보너스 번호는 숫자여야 합니다.",
    INTEGER: "보너스 번호는 정수여야 합니다.",
    RANGE: "보너스 번호는 1부터 45 사이여야 합니다.",
    DUPLICATE: "당첨 번호와 보너스 번호는 중복될 수 없습니다.",
  },

  RETRY: {
    INPUT: "다시 시작 여부는 y 또는 n이어야 합니다.",
  },
};

export default ERROR_MESSAGE;
