import readline from "node:readline";

export const readLineAsync = (query = "") => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
};

export const retryUntilValidInput = async ({ readUserInput, validator }) => {
  while (true) {
    try {
      const userInput = await readUserInput();
      validator(userInput);
      return userInput;
    } catch (error) {
      console.error(error.message);
    }
  }
};
