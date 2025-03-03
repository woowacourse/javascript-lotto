import calculateRevenueRate from './domain/model/calculateRevenueRate.js';
import createLottos from './domain/model/createLottos.js';
import LottoStatistics from './domain/model/LottoStatistics.js';

import LottoFormView from './view/ui/LottoFormView.js';
import LottoResultView from './view/ui/LottoResultView.js';
import changeButtonStatus from './view/ui/utils/changeButtonStatus.js';

class LottoGame {
  constructor() {
    this.userLottos = null;
    this.userMoney = null;
    this.lottoStatistics = new LottoStatistics();
  }

  handlePurchaseLottos() {
    this.userMoney = LottoFormView.readMoney();
    if (!this.userMoney) {
      return;
    }
    changeButtonStatus('#purchase-button');
    this.userLottos = createLottos(this.userMoney);
    LottoFormView.renderUserLottos(this.userLottos);
    LottoFormView.renderWinningLotto();
  }

  getRevenueRate() {
    const profit = this.lottoStatistics.calculateProfit();
    const revenueRate = calculateRevenueRate(profit, this.userMoney);
    return revenueRate;
  }

  handleCheckResults() {
    const winningNumbers = LottoFormView.readWinningNumbers();
    if (!this.userLottos || !winningNumbers) { return; }
    const bonusNumber = LottoFormView.readBonusNumber(winningNumbers);
    if (!bonusNumber) { return; }
    const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
    const rankResult = this.lottoStatistics.compareLottos(this.userLottos, winningLotto);
    changeButtonStatus('#result-button');
    LottoResultView.toggleModal();
    LottoResultView.renderStatisticsResult(rankResult);
    LottoResultView.renderRevenueRate(this.getRevenueRate());
  }

  handleCloseModal() {
    document.querySelectorAll('.modal-items').forEach((element) => {
      element.remove();
    });
    this.lottoStatistics.init();
    LottoResultView.toggleModal();
  }
}

const lottoGame = new LottoGame();

document.getElementById('purchase-button').addEventListener('click', () => lottoGame.handlePurchaseLottos());
document.getElementById('result-button').addEventListener('click', () => lottoGame.handleCheckResults());
document.getElementById('reset-button').addEventListener('click', () => location.reload(true));
document.getElementById('reset-close-button').addEventListener('click', () => lottoGame.handleCloseModal());
