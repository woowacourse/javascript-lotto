import calculateRevenueRate from './domain/model/calculateRevenueRate.js';
import createLottos from './domain/model/createLottos.js';
import LottoStatistics from './domain/model/LottoStatistics.js';

import InputView from './view/ui/InputView.js';
import OutputView from './view/ui/OutputView.js';

let userLottos;
let userMoney;
const lottoStatistics = new LottoStatistics();

// 1. 로또 구매하기
document.getElementById('purchase-button').addEventListener('click', () => {
  userMoney = InputView.readMoney();
  if (!userMoney) {
    return;
  }
  userLottos = createLottos(userMoney);
  OutputView.printUserLottos(userLottos);
});

function getRevenueRate() {
  const profit = lottoStatistics.calculateProfit();
  const revenueRate = calculateRevenueRate(profit, userMoney);
  return revenueRate;
}

// 2. 로또 결과 확인하기
document.getElementById('result-button').addEventListener('click', () => {
  const winningNumbers = InputView.readWinningNumbers();
  const bonusNumber = InputView.readBonusNumber(winningNumbers);
  if (!userLottos || !winningNumbers || !bonusNumber) {
    return;
  }
  const winningLotto = { bonusNumber, lottoNumber: winningNumbers };
  const rankResult = lottoStatistics.compareLottos(userLottos, winningLotto);
  OutputView.printStatisticsResult(rankResult);
  OutputView.printRevenueRate(getRevenueRate());
});

// 3. 로또 초기화하기
document.getElementById('reset-button').addEventListener('click', () => {
  location.reload(true);
});

// 4. 결과 닫기
document.getElementById('reset-close-button').addEventListener('click', () => {
  document.querySelectorAll('.modal-items').forEach((element) => {
    element.remove();
  });
  lottoStatistics.init();
  OutputView.toggleModal();
});
