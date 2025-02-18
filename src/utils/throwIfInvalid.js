import Output from "../view/Output.js";

const throwIfInvalid = async (inputFn, validateFn) => {
  while (true) {
    try {
      const input = await inputFn();
      return validateFn(input);
    } catch (error) {
      Output.printErrorMessage(error.message);
    }
  }
};

export default throwIfInvalid;
