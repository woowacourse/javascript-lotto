import { readLineAsync } from "../utils/readLineAsync.js";
import { outputPrint } from "./Output.js";

export const getInput = (message) => {
  return readLineAsync(message);
};

export const retryUntilValid = async (getInputFn, parseFn, validator) => {
  while (true) {
    try {
      const userInput = await getInputFn();
      const result = parseFn(userInput);
      validator(result);
      return result;
    } catch (error) {
      outputPrint(error.message);
    }
  }
};
