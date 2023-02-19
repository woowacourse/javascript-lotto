import MESSAGE from '../constant/message.js';
import Console from '../util/Console.js';
import stringHandler from '../util/stringHandler.js';

const OutputView = {
  printLottos(lottoNumbers) {
    Console.print(`${MESSAGE.BUY_LOTTO(lottoNumbers.length)}`);
    lottoNumbers.forEach(lottoNumber =>
      Console.print(`[${lottoNumber.join(', ')}]`)
    );
    Console.print('');
  },

  printStatistics(amountOfRanks, profit) {
    this.printStatisticsMessage();
    this.printRanks(amountOfRanks);
    this.printProfit(profit);
  },

  printStatisticsMessage() {
    Console.print('');
    Console.print(MESSAGE.STATISTICS);
    Console.print(MESSAGE.DIVISION_LINE);
  },

  printRanks(amountOfRanks) {
    MESSAGE.MATCH_TABLE.forEach((matchLetter, i) =>
      Console.print(
        MESSAGE.MATCH_RESULT(
          matchLetter,
          amountOfRanks[amountOfRanks.length - i - 1]
        )
      )
    );
  },

  printProfit(profit) {
    Console.print(MESSAGE.PROFIT(stringHandler.addComma(profit)));
  },
};

export default OutputView;
