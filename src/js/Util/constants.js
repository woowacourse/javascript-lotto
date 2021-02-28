export const ELEMENT = {
  PURCHASE_AMOUNT_INPUT: "#purchase-amount-input",
  AUTO_PURCHASE_INPUT: "#auto-purchase-input",
  PURCHASE_AMOUNT_LABEL: "#purchase-amount-label",

  PURCHASE_AMOUNT_SUBMIT_BUTTON: "#purchase-amount-submit-button",
  TOGGLE_BUTTON: ".toggle-button",
  RESTART_BUTTON: "#restart-button",
  OPEN_RESULT_MODAL_BUTTON: ".open-result-modal-button",

  PURCHASE_CONTAINER: "#purchase-container",
  RECEIPT_CONTAINER: "#receipt-container",
  TICKET_IMAGE_NUMBER_CONTAINER: "#ticket-image-number-container",
  WIN_NUMBER_CONTAINER: "#win-number-container",
  SELF_PURCHASE_CONTAINER: "#self-purchase-container",
  AUTO_PURCHASE_CONTAINER: "#auto-purchase-container",

  BONUS_NUMBER: ".bonus-number",
  WINNING_NUMBER: ".winning-number",
  LOTTO_IMAGE_NUMBER: "#lotto-image-number",
  WINNING_COUNT: ".winning-count",
  SELF_PURCHASE_LOTTO_NUMBER: ".self-purchase-lotto-number",

  TOTAL_EARNING_RATE: "#total-earning-rate",

  MODAL: ".modal",
  MODAL_CLOSE: ".modal-close",

  HIDDEN: "hidden",
  FLEX_COL: "flex-col",
  OPEN: "open",
};

const ONE_TICKET_PRICE = 1000;

export let STANDARD_NUMBER = {
  LOTTO_MAX_NUMBER: 45,
  TICKET_NUMBER_LENGTH: 6,
  ONE_TICKET_PRICE: ONE_TICKET_PRICE,
  MIN_PURCHASE_PRICE: ONE_TICKET_PRICE,
  MAX_PURCHASE_PRICE: 5000,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
};

export const MATCHING_NUMBER = {
  SIX: 6,
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
};

export const RANK = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
  FOURTH: "fourth",
  FIFTH: "fifth",
  LOSER: "loser",
};

export const WINNING_PRIZE = {
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
};

export const ALERT_MESSAGE = {
  STRING_AND_BLANK_FORBIDDEN: "문자 및 공백은 입력 불가능합니다.",
  OUT_OF_MONEY_RANGE: `${STANDARD_NUMBER.ONE_TICKET_PRICE}원 이상, ${STANDARD_NUMBER.MAX_PURCHASE_PRICE}원 이하만 입력 가능합니다.`,
  NOT_THOUSAND_MULTIPLES: `${STANDARD_NUMBER.ONE_TICKET_PRICE}원 단위로만 입력 가능합니다.`,

  BLANK_FORBIDDEN: "공백은 입력 불가능합니다.",
  OUT_OF_WINNING_NUMBER_RANGE: `${STANDARD_NUMBER.MIN_LOTTO_NUMBER}에서 ${STANDARD_NUMBER.MAX_LOTTO_NUMBER}까지의 숫자만 입력 가능합니다.`,
  DUPLICATED_INPUT_FORBIDDEN: "중복된 값은 입력 불가능합니다.",

  OVER_CURRENT_BALANCE: "구매 가능 금액을 초과하여 구매할 수 없습니다.",
};
