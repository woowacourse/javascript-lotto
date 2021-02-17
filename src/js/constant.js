export const INIT = {
  LOTTOS: [],
  DETAIL: false,
};

export const LOTTO = {
  PRICE: 1000,
  SIZE: 6,
  MIN_NUM: 1,
  MAX_NUM: 45,
};

export const SELECTOR = {
  BUY: "#buy",
  BUY_INPUT: "#buy-input",
  BUY_BUTTON: "#buy-button",
  POCKET: "#pocket",
  POCKET_TOGGLE: "#pocket-toggle-number",
  POCKET_LOTTOS: "#pocket-lottos",
  WINNING: "#winning",
  POCKET_LOTTO: ".pocket-lotto-numbers",
};

export const ERROR_MESSAGE = {
  PRICE_CANNOT_BE_FLOAT: "금액은 소수가 될 수 없습니다.",
  PRICE_CANNOT_BE_NEGATIVE: "금액은 자연수여야 합니다.",
  PRICE_CANNOT_BE_LESS_THAN_THOUSAND: "최소 입력금액은 1000원입니다.",
  PRICE_CANNOT_BE_OVERWRITTEN: "금액을 중복해서 입력할 수 없습니다.",
};
