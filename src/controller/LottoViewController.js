import InputHandler from '../input/InputHandler.js';
import OutputView from '../view/OutputView.js';
import { LINE_BREAK, OUTPUT_MESSAGE } from '../constants/constants.js';
import { printLottoRank } from '../utils/printLottoRank.js';

class LottoViewController {
  static async getPurchaseMoney() {
    return await InputHandler.purchaseMoney();
  }

  static async getWinningNumbers() {
    return await InputHandler.winningNumbers();
  }

  static async getBonusNumber(winningNumbers) {
    return await InputHandler.bonusNumber(winningNumbers);
  }

  static printStatistics(rank) {
    OutputView.print(OUTPUT_MESSAGE.STATISTICS);
    OutputView.print(OUTPUT_MESSAGE.LINE);
    printLottoRank(rank);
  }

  static printLottoNumber(lottoMaker) {
    OutputView.print(`${lottoMaker.purchaseCount}${OUTPUT_MESSAGE.PURCHASE_COUNT}`);
    lottoMaker.lottoList.forEach((lotto) => {
      OutputView.print(lotto.numbers);
    });
    OutputView.print(LINE_BREAK);
  }

  static printWinningRate(winningRate) {
    OutputView.print(OUTPUT_MESSAGE.WINNING_RATE.replace('{}', winningRate));
  }
}

export default LottoViewController;
