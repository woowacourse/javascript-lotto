import Console from '../utils/Console.js';

const OutputView = {
  printErrorMessage(message) {
    Console.print(`[ERROR] ${message}`);
  },

  printPurchaseResult(purchasedLottos) {
    Console.print(`${purchasedLottos.length}개를 구매했습니다.`);
    purchasedLottos.forEach((lotto) => Console.print(lotto));
  },
};

export default OutputView;
