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

  onModalClose(closeButton, modalBackground, modalContent, callback) {
    this.onClick(closeButton, callback);
    this.onClick(modalBackground, callback);
    this.onEsc(document, callback);
    this.onClick(modalContent, (event) => {
      event.stopPropagation();
    });
  },

  onRestart(restartButton, callback) {
    this.onClick(restartButton, callback);
  },
};

export default eventHandler;
