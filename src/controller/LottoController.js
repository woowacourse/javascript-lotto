import LottoOutputView from '../view/LottoOutputView.js';
import InputService from '../service/InputService.js';
import LottoService from '../service/LottoService.js';

class LottoController {
  async run() {
    const lottoMaker = await this.purchaseLotto();
    const { winningNumbers, bonusNumber } = await this.getWinningInfo();
    const lottoRank = LottoService.calculateLottoRank(lottoMaker, winningNumbers, bonusNumber);
    const winningRate = LottoService.calclateWinningRate(lottoMaker, lottoRank);
    this.displayResult(lottoRank, winningRate);
    await InputService.reStart(() => this.run());
  }

  async purchaseLotto() {
    const purchaseMoney = await InputService.getPurchaseMoney();
    const lottoMaker = LottoService.createLotto(purchaseMoney);
    LottoOutputView.printLottoNumber(lottoMaker);
    return lottoMaker;
  }

  async getWinningInfo() {
    const winningNumbers = await InputService.getWinningNumbers();
    const bonusNumber = await InputService.getBonusNumber(winningNumbers.numbers);
    return { winningNumbers, bonusNumber };
  }

  displayResult(lottoRank, winningRate) {
    LottoOutputView.printStatistics(lottoRank);
    LottoOutputView.printWinningRate(winningRate);
  }
}

export default LottoController;
