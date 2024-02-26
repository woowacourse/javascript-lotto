const WebOutputView = {
  printError(ele, errorMessage) {
    ele.innerHTML = errorMessage;
    ele.classList.remove('hidden');
  },
};

export default WebOutputView;
