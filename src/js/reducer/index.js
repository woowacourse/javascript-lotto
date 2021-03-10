import { ACTION_TYPE } from "../constants/index.js";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOTTOS.ADDED:
      return {
        ...state,
        lottos: [...state.lottos, ...action.payload],
        isPurchasing: false,
        cash: 0,
      };

    case ACTION_TYPE.LOTTOS.ADDING:
      return {
        ...state,
        isPurchasing: true,
        cash: action.payload,
      };

    case ACTION_TYPE.LOTTOS.CANCEL_ADDING:
      return {
        ...state,
        isPurchasing: false,
        cash: 0,
      };

    case ACTION_TYPE.WINNING_NUMBERS.SET:
      return {
        ...state,
        winningNumber: { ...action.payload },
      };

    case ACTION_TYPE.CLEAR:
      return {
        lottos: [],
        isPurchasing: false,
        cash: 0,
        winningNumber: { numbers: [], bonusNumber: 0 },
      };

    default:
      return { ...state };
  }
};

export default reducer;
