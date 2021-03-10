const ACTION_TYPE = Object.freeze({
  LOTTOS: {
    ADDING: "lottos/adding",
    CANCEL_ADDING: "lottos/adding/cancel",
    ADDED: "lottos/added",
  },
  WINNING_NUMBERS: {
    SET: "winningNumbers/set",
  },
  CLEAR: "clear",
});

export default ACTION_TYPE;
