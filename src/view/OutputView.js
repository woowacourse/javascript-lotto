const Console = require('../util/Console');

const OutputView = {
  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },
};

module.exports = OutputView;
