import InputHandler from '../input/InputHandler.js';
import LottoMaker from '../domain/LottoMaker.js';
import LottoMatch from '../domain/LottoMatch.js';
import LottoGame from '../domain/LottoGame.js';
import LottoViewController from './LottoViewController.js';
import { YES } from '../constants/constants.js';
import { LOTTO_CONDITION } from '../constants/constants.js';

class LottoController {
  async run() {
    const lottoMaker = new LottoMaker(await LottoViewController.getPurchaseMoney());
    LottoViewController.printLottoNumber(lottoMaker);

    const winningNumbers = await LottoViewController.getWinningNumbers();
    const bonusNumber = await LottoViewController.getBonusNumber(winningNumbers.numbers);

    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    const lottoGame = new LottoGame();

    lottoMaker.lottoList.forEach((lotto) => {
      lottoGame.addRankingCount(
        LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
      );
    });

    LottoViewController.printStatistics(lottoGame.rank);

    const winningRate = LottoGame.calculateWinningRate(
      LOTTO_CONDITION.PRICE * lottoMaker.lottoList.length,
      LottoGame.calculateTotalPrize(lottoGame.rank),
    );

    LottoViewController.printWinningRate(winningRate);

    await this.reStart();
  }

  async reStart() {
    const reStart = await InputHandler.reStart();
    if (reStart === YES) {
      return this.run();
    }
  }

  createLotto() {}
}

export default LottoController;
