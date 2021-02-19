import { ACTION_TYPE } from "./constants/index.js";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOTTOS:
      return { ...state, lottos: [...state.lottos, ...action.payload] };
    default:
      return state;
  }
};

export default reducer;
