import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Console {
  static readLine(query, callback) {
    rl.question(query, callback)
  }
  
  static print(input){
    console.log(input)
  }

  static close(){
    rl.close()
  }
}

export default Console;