const ALERT_MESSAGE = Object.freeze({
  ERROR: {
    CASH_INPUT: {
      NOT_A_NUMBER: "숫자인 구입 금액을 입력해주세요.",
      NOT_AN_INTEGER: "정수인 구입 금액을 입력해주세요.",
      OUT_OF_RANGE: "1000원 이상인 구입 금액을 입력해주세요.",
    },
    WINNING_NUMBERS_INPUT: {
      NOT_A_NUMBER: "숫자인 당첨번호를 입력해주세요.",
      NOT_AN_INTEGER: "정수인 당첨번호를 입력해주세요.",
      OUT_OF_RANGE: "1이상 45이하의 정수인 당첨번호를 입력해주세요",
      DUPLICATED: "중복되지 않은 당첨번호를 입력해주세요.",
    },
  },
});

export default ALERT_MESSAGE;
