import MESSAGE from '../constant/message.js';
import Console from '../util/Console.js';

const OutputView = {
  printLottoNumbersList(lottoNumbers) {
    Console.print(`${MESSAGE.BUY_LOTTO(lottoNumbers.length)}`);
    lottoNumbers.forEach(lottoNumber =>
      Console.print(`[${lottoNumber.join(', ')}]`)
    );
    Console.print('');
  },

  printStatistics(amountOfRank) {
    Console.print();
    Console.print(MESSAGE.STATISTICS);
    Console.print(MESSAGE.DIVISION_LINE);
    MESSAGE.MATCH_TABLE.forEach((v, i) =>
      Console.print(`${v}${amountOfRank[amountOfRank.length - i - 1]}개`)
    );
  },
};

export default OutputView;
