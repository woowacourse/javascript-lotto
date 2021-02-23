import { ACTION_TYPE, STATE_TYPE } from "../constants/index.js";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOTTOS.ADDED:
      return {
        target: STATE_TYPE.LOTTOS,
        state: {
          ...state,
          lottos: [...state.lottos, ...action.payload],
        },
      };
    case ACTION_TYPE.WINNING_NUMBERS.SET:
      return {
        target: STATE_TYPE.WINNING_NUMBER,
        state: {
          ...state,
          winningNumber: { ...action.payload },
        },
      };

    default:
      return {
        state,
      };
  }
};

export default reducer;
