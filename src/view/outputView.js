const Console = require('../utils/Console');

const outputView = {
  printLottoCount(count) {
    Console.print(`${count}개를 구매했습니다.`);
  },

  printLotto(lotto) {
    Console.print(`[${lotto.join(', ')}]`);
  },
};

module.exports = outputView;
