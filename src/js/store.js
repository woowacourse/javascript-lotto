import reducer from "./reducer.js";

const createStore = (reducer) => {
  let state = { lottos: [] };
  let listeners = { lottos: [] };

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners[action.type].forEach((listener) => listener());
  };

  const subscribe = (actionType, listener) => {
    listeners[actionType].push(listener);
  };

  return { getState, dispatch, subscribe };
};

const store = createStore(reducer);

export default store;
