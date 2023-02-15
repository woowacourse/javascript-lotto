const Console = require("../utils/Console");

const InputView = {
  readPurchaseAmount(callback) {
    Console.readLine("금액질문", callback);
  },

  readLottoNumbers(callback) {
    Console.readLine("로또 질문", callback);
  },

  readBonusNumber(callback) {
    Console.readLine("보너스 질문", callback);
  },
};

module.exports = InputView;
