export const TICKET = {
  PRICE: 1000,
  SIZE: 6,
  BONUS_SIZE: 1,
  MIN_NUM: 1,
  MAX_NUM: 45,
}

export const RANK = {
  FIRST: { TEXT: "6개", PRICE: 2000000000 },
  SECOND: { TEXT: "5개 + 보너스볼", PRICE: 30000000 },
  THIRD: { TEXT: "5개", PRICE: 1500000 },
  FOURTH: { TEXT: "4개", PRICE: 50000 },
  FIFTH: { TEXT: "3개", PRICE: 5000 },
}

export const SELECTOR = {
  BUY_SECTION: "#buy",
  BUY_INPUT: "#buy-input",
  BUY_BUTTON: "#buy-button",
  POCKET_SECTION: "#pocket",
  POCKET_TOGGLE: ".lotto-numbers-toggle-button",
  POCKET_LOTTOS: "#pocket-lottos",
  WINNING_SECTION: "#winning",
  WINNING_NUMBER: ".winning-number",
  BOUNS_NUMBER: ".bonus-number",
  OPEN_RESULT_MODAL_BUTTON: ".open-result-modal-button",
  MODAL_SECTION: ".modal",
  MODAL_CLOSE: ".modal-close",
  RESET_BUTTON: "#reset",
}

export const ERROR_MESSAGE = {
  PRICE_CANNOT_BE_FLOAT: "금액은 소수가 될 수 없습니다.",
  PRICE_CANNOT_BE_NEGATIVE: "금액은 자연수여야 합니다.",
  PRICE_CANNOT_BE_LESS_THAN_THOUSAND: "최소 입력금액은 1000원입니다.",
  ANSWER_CANNOT_BE_EMPTY: "당첨 번호를 모두 입력해주세요.",
  ANSWER_CANNOT_BE_DUPLICATED: "당첨 번호는 중복되면 안됩니다.",
  ANSWER_CANNOT_BE_OUT_RANGE: "당첨 번호는 1이상 45이하의 숫자여야 합니다.",
  ANSWER_CANNOT_BE_FLOAT: "당첨 번호는 소수가 될 수 없습니다.",
}

Object.freeze(TICKET)
Object.freeze(RANK)
Object.freeze(SELECTOR)
Object.freeze(ERROR_MESSAGE)
