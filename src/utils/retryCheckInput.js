import Console from "./Console.js";

const retryCheckInput = async (prompt, validation) => {
  try {
    const input = await prompt();
    return validation(input);
  } catch (error) {
    Console.printError(error.message);
    return retryCheckInput(prompt, validation);
  }
};

export default retryCheckInput;
