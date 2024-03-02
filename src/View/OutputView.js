import DELIMITER from '../Constants/delimiter.js';
import PROGRESS_MESSAGE from '../Constants/Messages/progressMessage.js';
import LOTTO_REWARD from '../Constants/lottoReward.js';

const OutputView = {
  printBoughtLottoLength(lottoCount) {
    this.printMessage(`${lottoCount}${PROGRESS_MESSAGE.BUY_LOTTO}`);
  },

  printBoughtLottos(boughtLottos) {
    boughtLottos.forEach((lotto) => this.printMessage(`[${lotto.join(DELIMITER.LOTTO_NUMBER_SEPERATOR + ' ')}]`));
  },

  printRewardResult(rewardResult) {
    rewardResult.forEach((result) => {
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
