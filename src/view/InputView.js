const Console = require('../util/Console');

const InputView = {
  readUserBudget(callback) {
    Console.read('구입금액을 입력해 주세요.', callback);
  },
};
