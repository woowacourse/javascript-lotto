const eventListenersController = (events) => {
  events.forEach(({ target, type, handler }) => {
    if (typeof target === 'string') {
      return document.getElementById(target).addEventListener(type, handler);
    }

    return target.addEventListener(type, handler);
  });
};

export default eventListenersController;
