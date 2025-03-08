import LottoOutputView from '../view/LottoOutputView.js';
import InputService from '../service/InputService.js';
import LottoService from '../service/LottoService.js';
import OutputView from '../view/OutputView.js';
import { YES } from '../../common/constants/constants.js';

class LottoController {
  async run() {
    const lottoMaker = await this.purchaseLotto();
    const { winningNumbers, bonusNumber } = await this.getWinningInfo();
    const lottoRank = LottoService.calculateLottoRank(lottoMaker, { winningNumbers, bonusNumber });
    const winningRate = LottoService.calclateWinningRate(lottoMaker, lottoRank);
    this.displayResult(lottoRank, winningRate);
    await this.reStart();
  }

  async purchaseLotto() {
    try {
      const purchaseMoney = await InputService.getPurchaseMoney();
      OutputView.print('');

      const lottoMaker = LottoService.createLotto(purchaseMoney);
      LottoOutputView.printLottoNumber(lottoMaker);
      return lottoMaker;
    } catch (e) {
      OutputView.print(e.message);
      return await this.purchaseLotto();
    }
  }

  async getWinningInfo() {
    try {
      const winningNumbers = await InputService.getWinningNumbers();
      OutputView.print('');
      const bonusNumber = await InputService.getBonusNumber(winningNumbers.numbers);
      OutputView.print('');
      return { winningNumbers, bonusNumber };
    } catch (e) {
      OutputView.print(e.message);
      return await this.getWinningInfo();
    }
  }

  async reStart() {
    try {
      const input = await InputService.reStart();
      if (input === YES) {
        return this.run();
      }
      return input;
    } catch (e) {
      OutputView.print(e.message);
      return await this.reStart();
    }
  }

  displayResult(lottoRank, winningRate) {
    LottoOutputView.printStatistics(lottoRank);
    LottoOutputView.printWinningRate(winningRate);
  }
}

export default LottoController;
