const WebOutputView = {
  printMessage(target, message) {
    if (target.classList.contains('error')) {
      target.classList.remove('error');
    }
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
