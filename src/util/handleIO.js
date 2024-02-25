import readline from 'readline';

const handleIO = {
  print(message) {
    console.log(message);
  },

  validateArguments(query) {
    if (arguments.length !== 1) {
      throw new Error('인자는 1개만 허용됩니다.');
    }
    if (typeof query !== 'string') {
      throw new Error('질의에 포함시킬 내용은 오직 문자열 타입만 허용됩니다.');
    }
  },

  createReadlineInterface() {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  },

  read(query) {
    this.validateArguments(query);
    const rl = this.createReadlineInterface();
    return new Promise((resolve) => {
      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  },
};

export default handleIO;
