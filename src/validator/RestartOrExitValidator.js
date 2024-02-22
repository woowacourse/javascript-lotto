const RestartOrExitValidator = {
  isNotRestartOrExitKeyword(inputValue) {
    return inputValue !== 'y' && inputValue !== 'n' ? true : false;
  },
};

export default RestartOrExitValidator;
