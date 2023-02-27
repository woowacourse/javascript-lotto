const HTML_ELEMENTS = {
  MONEY_FORM: document.getElementById("money_form"),
  BTN_MONEY: document.getElementById("btn_money"),
  INPUT_MONEY: document.getElementById("input_money"),

  WIN_CONTENTS: document.getElementById("win_contents"),
  WIN_FORM: document.getElementById("win_form"),

  BUY_COUNT_TEXT: document.getElementById("buy_count_text"),
  BUY_LOTTOS: document.getElementById("buy_lottos"),

  MODAL: document.getElementById("modal"),
  FIRST: document.getElementById("first"),
  SECOND: document.getElementById("second"),
  THIRD: document.getElementById("third"),
  FOURTH: document.getElementById("fourth"),
  FIFTH: document.getElementById("fifth"),
  REVENUE_TEXT: document.getElementById("revenue_text"),
  BTN_CLOSE: document.getElementById("btn_close"),
  BTN_RESTART: document.getElementById("btn_restart"),

  WINNUM: document.getElementsByName("winNum"),
  BONUSNUM: document.getElementsByName("bonusNum")[0],
};

const ACTION = {
  SUBMIT: "submit",
  CLICK: "click",
};

const ATTRIBUTE = {
  NONE: "none",
  BLOCK: "block",
  TRUE: "true",
};

module.exports = { HTML_ELEMENTS, ACTION, ATTRIBUTE };
