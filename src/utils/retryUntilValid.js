import readLineAsync from "./readLineAsync.js";

const retryUntilValid = async (promptMessage, validateFunc) => {
  try {
    const input = await readLineAsync(promptMessage);
    const validatedInput = validateFunc(input);
    return validatedInput;
  } catch (err) {
    console.log(err);
    return retryUntilValid(promptMessage, validateFunc);
  }
};

export default retryUntilValid;
