import InputHandler from './input/InputHandler.js';
import LottoMaker from './domain/LottoMaker.js';
import OutputView from './view/OutputView.js';
import { LINE_BREAK, LOTTO_CONDITION, MESSAGE } from './constants/constants.js';
import LottoMatch from './domain/LottoMatch.js';
import { calculateRank } from './domain/calculateRank.js';
import LottoRank from './domain/LottoRank.js';
import { calculateTotalPrize } from './domain/calculateTotalPrize.js';
import { calculateWinningRate } from './domain/calculateWinningRate.js';
import { YES } from './constants/constants.js';
import { printLottoRank } from './utils/printLottoRank.js';

class LottoController {
  #lottoList;
  #lottoRank;

  async run() {
    const lottoMaker = new LottoMaker(await this.inputPurchaseMoney());
    this.printLottoNumber(lottoMaker);
    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonusNumber(winningNumbers.numbers);
    this.#lottoList = lottoMaker.lottoList;

    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    this.#lottoRank = new LottoRank();

    this.calculateRank(lottoMatch);
    this.printStatstics();

    const winningRate = this.calculateWinningRate(lottoMaker);
    this.printWinningRate(winningRate);

    await this.reStart();
  }

  async inputPurchaseMoney() {
    return await InputHandler.purchaseMoney();
  }

  async inputWinningNumbers() {
    return await InputHandler.winningNumbers();
  }

  async inputBonusNumber(winningNumbers) {
    return await InputHandler.bonusNumber(winningNumbers);
  }

  calculateRank(lottoMatch) {
    this.#lottoList.forEach((lotto) => {
      lotto.ranking = calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto));
      this.#lottoRank.addRankingCount(lotto.ranking);
    });
  }

  calculateWinningRate(lottoMaker) {
    return calculateWinningRate(LOTTO_CONDITION.PRICE * lottoMaker.purchaseCount, calculateTotalPrize(this.#lottoList));
  }

  async reStart() {
    const reStart = await InputHandler.reStart();
    if (reStart === YES) {
      return this.run();
    }
  }

  printStatstics() {
    OutputView.print(MESSAGE.STATISTICS);
    OutputView.print(MESSAGE.LINE);
    const rank = this.#lottoRank.rank;
    printLottoRank(rank);
  }

  printLottoNumber(lottoMaker) {
    OutputView.print(lottoMaker.purchaseCount + MESSAGE.PURCHASE_COUNT);
    lottoMaker.lottoList.forEach((lotto) => {
      OutputView.print(lotto.numbers);
    });
    OutputView.print(LINE_BREAK);
  }

  printWinningRate(winningRate) {
    OutputView.print(`총 수익률은 ${winningRate}%입니다.`);
  }
}

export default LottoController;
