const Console = require('../utils/Console');

const inputHandler = (message, callback) => {
  Console.readLine(message, callback);
};

module.exports = inputHandler;
