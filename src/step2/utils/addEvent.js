export const addEvent = ({ target, eventType, callback }) => {
  target.addEventListener(eventType, callback);
};
