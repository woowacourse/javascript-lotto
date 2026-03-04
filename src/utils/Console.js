import readline from "readline";

const Console = {
  readLineAsync: async (inputMessage) => {
    return await new Promise((resolve) => {
      const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      r1.question(inputMessage, (input) => {
        resolve(input);
        r1.close();
      });
    });
  },
  print: (outputMessage) => {
    console.log(outputMessage);
  },
};

export default Console;
