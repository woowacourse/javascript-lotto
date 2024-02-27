const WebOutputView = {
  printMessage(target, message) {
    target.innerHTML = message;
  },

  printError(target, message) {
    target.classList.add('error');
    target.innerHTML = message;
  },

  reset(target) {
    target.innerHTML = '';
  },
};

export default WebOutputView;
