const Private = {
  robustInput(config) {
    try {
      inputString = readline();
      return resultFunc(inputString);
    } catch (e) {
      errorHandler(e);
      robustInput(readline, EntityObject);
    }
  },
};

const InputView = {};

export default InputView;
