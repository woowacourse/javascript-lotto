import InputHandler from '../input/InputHandler.js';
import LottoMaker from '../domain/LottoMaker.js';
import LottoMatch from '../domain/LottoMatch.js';
import LottoRank from '../domain/LottoRank.js';
import LottoViewController from './LottoViewController.js';
import LottoService from '../service/LottoService.js';
import { YES } from '../constants/constants.js';

class LottoController {
  async run() {
    const lottoMaker = new LottoMaker(await LottoViewController.getPurchaseMoney());
    LottoViewController.printLottoNumber(lottoMaker);

    const winningNumbers = await LottoViewController.getWinningNumbers();
    const bonusNumber = await LottoViewController.getBonusNumber(winningNumbers.numbers);

    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    const lottoRank = new LottoRank();

    LottoService.getRank(lottoMaker.lottoList, lottoMatch, lottoRank);
    LottoViewController.printStatistics(lottoRank.rank);

    const winningRate = LottoService.getWinningRate(lottoMaker, lottoMaker.lottoList);
    LottoViewController.printWinningRate(winningRate);
    await this.reStart();
  }

  async reStart() {
    const reStart = await InputHandler.reStart();
    if (reStart === YES) {
      return this.run();
    }
  }
}

export default LottoController;
