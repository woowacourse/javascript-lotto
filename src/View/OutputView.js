import DELIMITER from '../Constants/delimiter';
import PROGRESS_MESSAGE from '../Constants/Messages/progressMessage';
import LOTTO_REWARD from '../Constants/lottoReward';

const OutputView = {
  printBoughtLottoLength(lottoCount) {
    this.printMessage(`${lottoCount}${PROGRESS_MESSAGE.BUY_LOTTO}`);
  },

  printBoughtLottos(boughtLottos) {
    boughtLottos.forEach((lotto) => this.printMessage(`[${lotto.join(DELIMITER.LOTTO_NUMBER_SEPERATOR + ' ')}]`));
  },

  printRewardResult(rewardResult) {
    const sortedResult = rewardResult.sort((a, b) => b.rank - a.rank);

    sortedResult.forEach((result) => {
      this.printMessage(`${LOTTO_REWARD[result.rank].message}${result.count}개`);
    });
  },

  printRewardResultHeader() {
    this.printMessage(PROGRESS_MESSAGE.RESULT_HEADER);
  },

  printRateOfReturn(rateOfReturn) {
    this.printMessage(PROGRESS_MESSAGE.RATE_OF_RETURN_MESSAGE(rateOfReturn));
  },

  printMessage(message) {
    console.log(message);
  },
};

export default OutputView;
