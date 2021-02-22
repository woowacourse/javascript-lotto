import reducer from "../reducer/index.js";

const createStore = (reducer) => {
  let state = { lottos: [] };
  let listeners = { lottos: [] };

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
