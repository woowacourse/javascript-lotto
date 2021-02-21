const ALERT_MESSAGE = {
  ERROR: {
    CASH_INPUT: {
      NOT_A_NUMBER:
        "구입 금액이 숫자가 아닙니다. 숫자인 구입 금액을 입력해주세요.",
      NEGATIVE: "구입 금액이 음수입니다. 음수가 아닌 구입 금액을 입력해주세요.",
      UNDER_LOTTO_PRICE:
        "구입 금액이 1000원 미만입니다. 1000원 이상의 금액을 입력해주세요.",
    },
    WINNING_NUMBERS_INPUT: {
      EMPTY: "비어있는 당첨번호가 있습니다. 모든 당첨번호를 입력해주세요.",
      DUPLICATED:
        "중복된 당첨번호가 있습니다. 중복되지 않은 당첨번호를 입력해주세요.",
    },
  },
};

export default ALERT_MESSAGE;
