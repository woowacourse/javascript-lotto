import OutputView from "../views/OutputView.js";

const getValidInput = async (inputFn, validateFn, ...additionalArgs) => {
  while (true) {
    try {
      const input = await inputFn();
      return validateFn(input, ...additionalArgs);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
    }
  }
};

export default getValidInput;
