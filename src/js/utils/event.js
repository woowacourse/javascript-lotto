export const generateEventFactory = () => {
  const eventListeners = {};

  return {
    bindEvent: (eventName, eventListener) => {
      eventListeners[eventName] = eventListener;
    },
    emitEvent: (eventName, e) => {
      const eventListener = eventListeners[eventName];
      eventListener(e);
    },
  };
};
