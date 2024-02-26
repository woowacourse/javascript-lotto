const WebOutputView = {
  printError(ele, errorMessage) {
    ele.innerHTML = errorMessage;
    ele.classList.remove('hidden');
  },
  hiddenEle(ele) {
    ele.classList.add('hidden');
  },
};

export default WebOutputView;
