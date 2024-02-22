import CONFIG from '../constants/config';
import LotteryMachine from '../domain/services/LotteryMachine';
import lottoService from '../domain/services/lottoService';
import InputView from '../views/InputView';
import OutputView from '../views/OutputView';

class LottoController {
  #purchaseAmount;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  async run() {
    const lottery = new LotteryMachine(this.#purchaseAmount).makeLottery();
    const lottoCount = this.#purchaseAmount / CONFIG.PURCHASE_UNIT;
    OutputView.printLottoCount(lottoCount);
    OutputView.printLottery(lottery);
    const matchedResultList = await this.calculateMatchedResultList(lottery);
    const rankList = lottoService.calculateRankCounts(matchedResultList);
    OutputView.printLottoResult(rankList);
    const profit = lottoService.calculateProfit(matchedResultList, this.#purchaseAmount);
    OutputView.printProfit(profit);
  }

  async calculateMatchedResultList(lottery) {
    const winningNumbers = await InputView.readWinningNumbers();
    const bonusNumber = await InputView.readBonusNumber(winningNumbers);
    return lottery.map(lotto => lotto.getMatchedAmount(winningNumbers, bonusNumber));
  }
}

export default LottoController;
