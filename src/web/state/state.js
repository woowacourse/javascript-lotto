let state = {
  lottoCount: null,
  lottoArray: [],
  matchingCount: null,
  profitRate: null,
};

export const resetState = () => {
  state = {
    lottoCount: null,
    lottoArray: null,
    matchingCount: null,
    profitRate: null,
  };
};

export const setState = (newState) => {
  state = { ...state, ...newState };
};

export const getState = () => state;
