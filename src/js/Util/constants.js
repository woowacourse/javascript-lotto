export const ELEMENT = {
  PURCHASE_AMOUNT_SUBMIT_BUTTON: "#purchase-amount-submit-button",
  PURCHASE_AMOUNT_INPUT: "#purchase-amount-input",
  PURCHASE_AMOUNT_LABEL: "#purchase-amount-label",

  TOGGLE_BUTTON: ".toggle-button",

  RECEIPT_CONTAINER: "#receipt-container",
  TICKET_IMAGE_NUMBER_CONTAINER: "#ticket-image-number-container",
  WIN_NUMBER_CONTAINER: "#win-number-container",

  BONUS_NUMBER: ".bonus-number",
  WINNING_NUMBER: ".winning-number",

  WINNING_COUNT: ".winning-count",

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

export const ALERT_MESSAGE = {
  INVALID_NUMBER: "문자 및 공백은 입력 불가능합니다.",
  INVALID_MONEY_RANGE: "1000원 이상, 5000원 이하만 입력 가능합니다.",
  NOT_THOUSAND_MULTIPLES: "1000원 단위로만 입력 가능합니다.",

  BLANK_INCLUDED: "공백은 입력 불가능합니다.",
  INVALID_WINNING_NUMBER_RANGE: "1에서 45까지의 숫자만 입력 가능합니다.",
  DUPLICATED_WINNING_NUMBER: "중복된 값은 입력 불가능합니다.",
};
