import Output from "../view/Output.js";

export const retryUntilValid = async (getInputFn, validator) => {
  while (true) {
    try {
      const userInput = await getInputFn();
      validator(userInput);
      return userInput;
    } catch (error) {
      Output.print(error.message);
    }
  }
};
