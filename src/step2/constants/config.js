const MATCH_ROW_CONFIGS = [
  { rankKey: "5th", selector: "#match-3-count" },
  { rankKey: "4th", selector: "#match-4-count" },
  { rankKey: "3rd", selector: "#match-5-count" },
  { rankKey: "2nd", selector: "#match-5-bonus-count" },
  { rankKey: "1st", selector: "#match-6-count" },
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
    INPUTS: ".winning-number-input",
  },
  MODAL: {
    CONTAINER: "#result-modal-container",
    CLOSE_BUTTON: "#modal-close",
    RESTART_BUTTON: "#restart",
    PROFIT_RATE: "#result-profit-rate",
    MATCH_ROWS: MATCH_ROW_CONFIGS,
  },
};
