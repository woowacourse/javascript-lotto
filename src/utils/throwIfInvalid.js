import Output from "../views/Output.js";

const throwIfInvalid = async (inputFn, validateFn, ...additionalArgs) => {
  while (true) {
    try {
      const input = await inputFn();
      return validateFn(input, ...additionalArgs);
    } catch (error) {
      Output.printErrorMessage(error.message);
    }
  }
};

export default throwIfInvalid;
