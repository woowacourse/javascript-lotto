import { ResultMessage } from '../constants/Constants.js';
import Console from '../utils/Console';
import ConvertMessage from '../utils/Convertor.js';

const OutputView = {
  printRanks(ranks) {
    console.log(ConvertMessage.lottoRank(ranks));
  },

  printProfitRate(profitRate) {
    console.log(ConvertMessage.profitRateResult(profitRate));
  },

  printResult(ranks, profitRate) {
    console.log('');
    console.log(ResultMessage.RESULT);
    OutputView.printRanks(ranks);
    OutputView.printProfitRate(profitRate);
    console.log('');
  },

  print(message) {
    console.log(message);
  },

  close() {
    Console.close();
  },
};

export default OutputView;
