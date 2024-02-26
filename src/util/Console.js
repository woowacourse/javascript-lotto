import readline from 'readline';

class Console {
  static readLineAsync(query) {
    return new Promise((resolve, reject) => {
      // console.log(query); 
      //TODO: class에선 arguments와 같은데,, 함수에선 다름
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, input => {
        rl.close();
        resolve(input);
      });
    });
  }

  static print(msg) {
    console.log(msg);
  }
}

export default Console;
