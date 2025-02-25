import InputHandler from '../input/InputHandler.js';
import OutputView from '../view/OutputView.js';
import LottoMaker from '../domain/LottoMaker.js';
import LottoMatch from '../domain/LottoMatch.js';
import LottoGame from '../domain/LottoGame.js';
import LottoOutputView from '../view/LottoOutputView.js';
import { YES } from '../constants/constants.js';
import { LOTTO_CONDITION } from '../constants/constants.js';

class LottoController {
  async run() {
    const purchaseMoney = await this.getPurchaseMoney();
    const lottoMaker = new LottoMaker(purchaseMoney);
    LottoOutputView.printLottoNumber(lottoMaker);

    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers.numbers);

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

  async getPurchaseMoney() {
    try {
      const money = await InputHandler.purchaseMoney();
      OutputView.print('');
      return money;
    } catch (e) {
      OutputView.print(e.message);
      return await this.getPurchaseMoney();
    }
  }

  async getWinningNumbers() {
    try {
      const winningNumbers = await InputHandler.winningNumbers();
      OutputView.print('');
      return winningNumbers;
    } catch (e) {
      OutputView.print(e.message);
      return await this.getWinningNumbers();
    }
  }

  async getBonusNumber(winningNumbers) {
    try {
      const bonusNumber = await InputHandler.bonusNumber(winningNumbers);
      OutputView.print('');
      return bonusNumber;
    } catch (e) {
      OutputView.print(e.message);
      return await this.getBonusNumber(winningNumbers);
    }
  }

  async reStart() {
    try {
      const input = await InputHandler.reStart();
      OutputView.print('');
      if (input === YES) {
        return this.run();
      }
      return input;
    } catch (e) {
      OutputView.print(e.message);
      return await this.reStart();
    }
  }
}

export default LottoController;
