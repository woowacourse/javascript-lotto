import { ACTION_TYPE } from "../constants/index.js";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CASH.ADDED: {
      return {
        ...state,
        cash: state.cash + action.payload,
      };
    }

    case ACTION_TYPE.LOTTOS.ADDED:
      return {
        ...state,
        lottos: [...state.lottos, ...action.payload],
      };

    case ACTION_TYPE.WINNING_NUMBER.SET:
      return {
        ...state,
        winningNumber: { ...action.payload },
      };

    case ACTION_TYPE.CLEAR:
      return {
        cash: 0,
        lottos: [],
        winningNumber: { numbers: [], bonusNumber: 0 },
      };

    default:
      return { ...state };
  }
};

export default reducer;
