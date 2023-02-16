import Console from '../utils/Console.js';

const OutputView = {
  printErrorMessage(message) {
    Console.print(`[ERROR] ${message}`);
  },

  printPurchaseCount(count) {
    Console.print(`${count}개를 구매했습니다.`);
  },

  printLottoNumbers(lottoNumbers) {
    Console.print(`[${lottoNumbers.sort((a, b) => a - b).join(', ')}]`);
  },
};

export default OutputView;
