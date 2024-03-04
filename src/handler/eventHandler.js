const eventHandler = {
  onClick(element, callback) {
    element.addEventListener('click', callback);
  },

  onKeyup(element, key, callback) {
    element.addEventListener('keyup', (e) => {
      if (e.code === key) {
        callback(e);
      }
    });
  },

  onEsc(element, callback) {
    this.onKeyup(element, 'Escape', callback);
  },

  onEnter(element, callback) {
    this.onKeyup(element, 'Enter', callback);
  },
};

export default eventHandler;
