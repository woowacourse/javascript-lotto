export function create(createState) {
  let state;
  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : { ...state, ...nextState };
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribeWithSelector = (
    listener,
    selector = getState,
    equalityFn = Object.is
  ) => {
    let currentSlice = selector(state);

    function listenerToAdd() {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        listener((currentSlice = nextSlice), previousSlice);
      }
    }

    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };

  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => listeners.clear();

  const resetState = () => {
    state = createState(setState, getState, { setState, getState });
    listeners.forEach((listener) => listener(state, state));
  };

  const api = { setState, getState, subscribe, destroy, resetState };

  state = createState(setState, getState, api);
  return api;
}
