export const addEvent = (target, event, callback) => {
  target.addEventListener(event, (e) => {
    callback(e);
  });
};
