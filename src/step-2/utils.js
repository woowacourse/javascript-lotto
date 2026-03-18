// state는 Record<string, any>
// triggers는 Record<string, (state) => void>
export const createStore = (initial = {}) => {
  let state = initial;
  const triggers = {};

  return {
    triggers,
    getState: () => state,
    setState: (updated) => {
      state = { ...state, ...updated };
      Object.values(triggers).forEach((trigger) => trigger(state));
    },
    appendTrigger: (key, triggerFn) => triggers[key] = triggerFn,
    hasTrigger: (key) => Boolean(triggers[key]),
  };
};
