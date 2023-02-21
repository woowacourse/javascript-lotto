const Console = require('../view/Console');

const exceptionHandler = (validate, input) => {
  try {
    validate(input);
    return true;
  } catch ({ message }) {
    Console.print(message);
    return false;
  }
};

module.exports = exceptionHandler;
