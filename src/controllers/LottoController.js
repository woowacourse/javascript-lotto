import { CONFIG } from '../constants';
import { LotteryMachine, lottoService } from '../domain/services';
import { InputView, OutputView } from '../views';

class LottoController {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  async run() {
    const lottery = new LotteryMachine(this.#purchaseAmount).makeLottery();
    this.#showPurchaseLottoResult(lottery);
    const matchedResultList = await this.#calculateMatchedResultList(lottery);
    this.#processLottoResult(matchedResultList);
    this.#processProfit(matchedResultList);
  }

  #showPurchaseLottoResult(lottery) {
    const lottoCount = this.#purchaseAmount / CONFIG.PURCHASE_UNIT;
    OutputView.printLottoCount(lottoCount);
    OutputView.printLottery(lottery);
  }

  #processLottoResult(matchedResultList) {
    const rankList = lottoService.calculateRankCounts(matchedResultList);
    OutputView.printLottoResult(rankList);
  }

  #processProfit(matchedResultList) {
    const profit = lottoService.calculateProfit(matchedResultList, this.#purchaseAmount);
    OutputView.printProfit(profit);
  }

  async #calculateMatchedResultList(lottery) {
    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumber = await InputView.readBonusNumber(winningNumbers);
    return lottery.map(lotto => lotto.getMatchedAmount(winningNumbers, bonusNumber));
  }
}

export default LottoController;
