import reducer from "../reducer/index.js";

const createStore = (reducer) => {
  let state = { lottos: [], winningNumber: { numbers: [], bonusNumber: 0 } };
  let listeners = { lottos: [], winningNumber: [] };

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action) => {
    const { target, state: newState } = reducer(state, action);
    state = newState;

    listeners[target]?.forEach((listener) => listener());
  };

  const subscribe = (target, listener) => {
    listeners[target].push(listener);
  };

  return { getState, dispatch, subscribe };
};

const store = createStore(reducer);

export default store;
