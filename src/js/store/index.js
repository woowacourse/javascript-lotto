import reducer from "../reducer/index.js";

const initialState = {
  lottos: [],
  winningNumber: { numbers: [], bonusNumber: 0 },
};

const createStore = (reducer, initialState) => {
  let state = initialState;
  let listeners = [];

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener();
    });
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { getState, dispatch, subscribe };
};

const store = createStore(reducer, initialState);

export default store;
