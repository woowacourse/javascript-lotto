import readline from "readline";

const Input = {
  retry: async (callback) => {
    try {
      return await callback();
    } catch (e) {
      console.log(e.message);
      return Input.retry(callback);
    }
  },
  readLineAsync: (query) => {
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
  },
};

export default Input;
