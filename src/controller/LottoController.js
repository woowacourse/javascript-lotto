import InputHandler from '../input/InputHandler.js';
import LottoMaker from '../domain/LottoMaker.js';
import LottoMatch from '../domain/LottoMatch.js';
import LottoGame from '../domain/LottoGame.js';
import LottoOutputView from '../view/LottoOutputView.js';
import { YES } from '../constants/constants.js';
import { LOTTO_CONDITION } from '../constants/constants.js';

class LottoController {
  async run() {
    const purchaseMoney = await InputHandler.purchaseMoney();
    const lottoMaker = new LottoMaker(purchaseMoney);
    LottoOutputView.printLottoNumber(lottoMaker);

    const winningNumbers = await InputHandler.winningNumbers();
    const bonusNumber = await InputHandler.bonusNumber(winningNumbers.numbers);

    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    const lottoGame = new LottoGame();

    lottoMaker.lottoList.forEach((lotto) => {
      lottoGame.addRankingCount(
        LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
      );
    });

    LottoOutputView.printStatistics(lottoGame.rank);

    const winningRate = LottoGame.calculateWinningRate(
      LOTTO_CONDITION.PRICE * lottoMaker.lottoList.length,
      LottoGame.calculateTotalPrize(lottoGame.rank),
    );

    LottoOutputView.printWinningRate(winningRate);

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
