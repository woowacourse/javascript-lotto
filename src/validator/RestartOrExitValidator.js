const RestartOrExitValidator = {
  isValidRestartOrExitKeyword(inputValue) {
    return inputValue === 'y' || inputValue == 'n';
  },
};

export default RestartOrExitValidator;
