import { addClassNameHandler, removeClassNameHandler } from './uiUtils.js';
import { winningLotto, lottoMachine, money } from '../instances.js';
import PROGRESS_MESSAGE from '../../Constants/Messages/progressMessage.js';

const modalOpenHandler = () => {
  const modalCard = document.getElementById('modalCard');
  addClassNameHandler(modalCard, 'modalOpen');
};

const renderStatisticsResultText = (rateOfReturn) => {
  const statisticsResultText = document.getElementById('statisticsResultText');

  statisticsResultText.textContent = PROGRESS_MESSAGE.RATE_OF_RETURN_MESSAGE(rateOfReturn);
};

export const modalCloseHandler = () => {
  const modalCard = document.getElementById('modalCard');
  removeClassNameHandler(modalCard, 'modalOpen');
};

export const statisticsResultHandler = ({ e, winningCounts }) => {
  e.preventDefault();
  modalOpenHandler();

  const totalWinningLottoInfo = winningLotto.getWinLottoNumbers();
  const result = lottoMachine.getRewardResult(totalWinningLottoInfo);

  winningCounts.forEach((winningCount, index) => {
    winningCount.textContent = result[index].count + '개';
  });

  const buyingMoney = money.getMoney();
  const rateOfReturn = lottoMachine.getRateOfIncome(buyingMoney);
  renderStatisticsResultText(rateOfReturn);
};
