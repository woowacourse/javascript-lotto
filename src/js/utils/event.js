export const event = {
  on: (target, eventName, handler) => {
    target.addEventListener(eventName, handler);
  },
  emit: (target, eventName, detail) => {
    const event = new CustomEvent(eventName, { detail });
    target.dispatchEvent(event);
  },
};
