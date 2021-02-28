import { ACTION_TYPE } from "../constants/index.js";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOTTOS.ADDED:
      return {
        ...state,
        lottos: [...state.lottos, ...action.payload],
      };

    case ACTION_TYPE.WINNING_NUMBERS.SET:
      return {
        ...state,
        winningNumber: { ...action.payload },
      };

    case ACTION_TYPE.CLEAR:
      return { lottos: [], winningNumber: { numbers: [], bonusNumber: 0 } };

    default:
      return { ...state };
  }
};

export default reducer;
