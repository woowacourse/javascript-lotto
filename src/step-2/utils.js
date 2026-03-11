// state는 Record<string, any>
export const createStore = (initial = {}) => {
  let state = initial;
  const triggers = [];

  return {
    triggers,
    getState: () => state,
    setState: (updated) => {
      state = { ...state, ...updated };
      triggers.forEach((trigger) => trigger(state));
    },
    appendTrigger: (trigger) => triggers.push(trigger),
  };
};
