export const RESULT_TABLE_ROWS = [
  { rankKey: "5th", label: "3개" },
  { rankKey: "4th", label: "4개" },
  { rankKey: "3rd", label: "5개" },
  { rankKey: "2nd", label: "5개+보너스볼" },
  { rankKey: "1st", label: "6개" },
];

export const SELECTORS = {
  PURCHASE: {
    FORM: "#purchase-money-form",
    INPUT: "#purchase-money-input",
  },
  RESULT: {
    SECTION: "#result-section",
    TEXT: "#result-text",
    CONTAINER: "#result-container",
  },
  WINNING: {
    SECTION: "#winning-section",
    FORM: "#winning-form",
    NUMBER_INPUTS: "#winning-number-inputs .winning-number-input",
    BONUS_INPUT: "#bonus-number-input",
    INPUTS: ".winning-number-input",
  },
  MODAL: {
    CONTAINER: "#result-modal-container",
    CLOSE_BUTTON: "#modal-close",
    RESTART_BUTTON: "#restart",
    TABLE_BODY: "#result-table-body",
    PROFIT_RATE: "#result-profit-rate",
  },
};
