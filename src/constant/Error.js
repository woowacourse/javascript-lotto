import DEFINITION, {PRICE} from "./Definition.js";

const ERROR = {
  USER_INPUT: {
    IS_EMPTY: "빈 값은 입력할 수 없습니다.",
  },
  WINNING_NUMBERS: {
    MESSAGE: {
      IS_WRONG_ARRAY_LENGTH: "로또는 6개의 숫자로 이루어져야합니다.",
      IS_DUPLICATED_NUMBER: "중복된 숫자는 입력하실 수 없습니다.",
      IS_ARRAY_NUMBER_RANGE_OVER: `${DEFINITION.MIN.LOTTO_NUMBER}~${DEFINITION.MAX.LOTTO_NUMBER} 사이의 숫자를 입력해야합니다.`,
      IS_NOT_NATURAL_NUMBER_IN_ARRAY: "숫자는 자연수여야 합니다.",
    },
    ELEMENT_ID: "winningErrorInfo",
  },

  WEB_WINNING_NUMBERS: {
    MESSAGE: {
      IS_DUPLICATED_NUMBER: "중복된 숫자는 입력하실 수 없습니다.",
      IS_ARRAY_NUMBER_RANGE_OVER: `${DEFINITION.MIN.LOTTO_NUMBER}~${DEFINITION.MAX.LOTTO_NUMBER} 사이의 숫자를 입력해야합니다.`,
      IS_NOT_NATURAL_NUMBER_IN_ARRAY: "숫자는 자연수여야 합니다.",
    },
    ELEMENT_ID: "winningErrorInfo",
  },
  BONUS_NUMBER: {
    MESSAGE: {
      IS_NUMBER_RANGE_OVER: `${DEFINITION.MIN.LOTTO_NUMBER}~${DEFINITION.MAX.LOTTO_NUMBER} 사이의 숫자를 입력해야합니다.`,
      IS_NOT_NATURAL_NUMBER: "숫자는 자연수여야 합니다.",
      IS_DUPLICATED: "당첨번호와 중복된 숫자는 입력하실 수 없습니다.",
    },
    ELEMENT_ID: "bonusErrorInfo",
  },
  WINNINGS_AND_BONUS: {
    IS_DUPLICATED: "당첨번호와 중복된 숫자는 입력하실 수 없습니다.",
  },
  WEB_WINNINGS_AND_BONUS: {
    MESSAGE: {
      IS_DUPLICATED: "당첨번호와 중복된 숫자는 입력하실 수 없습니다.",
    },
    ELEMENT_ID: "winningAndBonusErrorInfo",
  },
  PURCHASE_PRICE: {
    MESSAGE: {
      IS_NUMBER_RANGE_OVER: `${DEFINITION.MIN.LOTTO_PURCHASE_PRICE} 이상 ${DEFINITION.MAX.LOTTO_PURCHASE_PRICE} 이하의 숫자를 입력해야합니다.`,
      IS_NOT_MULTIPLE: `${PRICE.LOTTO} 단위로 나누어 떨어지는 숫자여야합니다.`,
    },
    ELEMENT_ID: "priceErrorInfo",
  },
  RESTART: {
    IS_NOT_YN: "선택은 Y 또는 N 으로 입력해야합니다.",
  },
};

export default ERROR;
