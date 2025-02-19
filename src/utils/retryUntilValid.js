import Output from "../view/Output.js";

export const retryUntilValid = async (getInputFn, parseFn, validator) => {
  while (true) {
    try {
      const userInput = await getInputFn();
      const result = parseFn(userInput);
      validator(result);
      return result;
    } catch (error) {
      Output.print(error.message);
    }
  }
};
