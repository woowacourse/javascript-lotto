import calculateRevenueRate from './domain/model/calculateRevenueRate.js';
import createLottos from './domain/model/createLottos.js';
import LottoStatistics from './domain/model/LottoStatistics.js';

import InputView from './view/ui/InputView.js';
import OutputView from './view/ui/OutputView.js';

class LottoGame {
  constructor() {
    this.userLottos = null;
    this.userMoney = null;
    this.lottoStatistics = new LottoStatistics();
  }

  handlePurchaseLottos() {
    this.userMoney = InputView.readMoney();
    if (!this.userMoney) {
      return;
    }
    this.userLottos = createLottos(this.userMoney);
    OutputView.renderUserLottos(this.userLottos);
    OutputView.renderWinningLotto();
  }

  getRevenueRate() {
    const profit = this.lottoStatistics.calculateProfit();
    const revenueRate = calculateRevenueRate(profit, this.userMoney);
    return revenueRate;
  }

  handleCheckResults() {
    const winningNumbers = InputView.readWinningNumbers();
    if (!this.userLottos || !winningNumbers) { return; }
    const bonusNumber = InputView.readBonusNumber(winningNumbers);
    if (!bonusNumber) { return; }
    const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
    console.log(this.lottoStatistics);
    const rankResult = this.lottoStatistics.compareLottos(this.userLottos, winningLotto);
    OutputView.toggleModal();
    OutputView.renderStatisticsResult(rankResult);
    OutputView.renderRevenueRate(this.getRevenueRate());
  }

  handleCloseModal() {
    document.querySelectorAll('.modal-items').forEach((element) => {
      element.remove();
    });
    this.lottoStatistics.init();
    OutputView.toggleModal();
  }
}

const lottoGame = new LottoGame();

document.getElementById('purchase-button').addEventListener('click', () => lottoGame.handlePurchaseLottos());
document.getElementById('result-button').addEventListener('click', () => lottoGame.handleCheckResults());
document.getElementById('reset-button').addEventListener('click', () => location.reload(true));
document.getElementById('reset-close-button').addEventListener('click', () => lottoGame.handleCloseModal());
