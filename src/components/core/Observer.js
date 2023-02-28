let currentObserver = null;

const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (state) => {
  Object.keys(state).forEach((key) => {
    const observers = new Set();
    let value = state[key];

    Object.defineProperty(state, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return value;
      },

      set(newData) {
        value = newData;
        observers.forEach((fn) => fn());
      },
    });
  });

  return state;
};

export { observe, observable };
