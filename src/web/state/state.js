let state = {
  lottoCount: null,
  lottoArray: [],
  winningLotto: null,
  matchingCount: null,
  profitRate: null,
};
let prevState = {
  ...state,
};

export const initialState = {
  lottoCount: null,
  lottoArray: [],
  winningLotto: null,
  matchingCount: null,
  profitRate: null,
};

export const resetState = () => {
  prevState = { ...state };
  state = {
    lottoCount: null,
    lottoArray: null,
    matchingCount: null,
    profitRate: null,
  };
};

export const setState = (newState) => {
  prevState = { ...state };
  state = { ...state, ...newState };
};

export const getState = () => state;

export const getPrevState = () => prevState;
