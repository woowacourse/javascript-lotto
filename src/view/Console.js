const { RL } = require('../constants/constants');

const Console = {
  readLine(query, callback) {
    RL.question(query, callback);
  },
  close() {
    RL.close();
  },
  print(message) {
    console.log(message);
  },
};
module.exports = Console;
