import { $, $$ } from '../utils/dom';

export const closeModal = () => {
  $('.modal-container').classList.add('d-none');
};

const showWinningCount = winnersStatistic => {
  const winningCountElements = $$('.winning-count');

  winningCountElements.forEach((element, index) => {
    element.textContent = `${winnersStatistic[index]}개`;
  });
};

const showEarningsRate = earningsRate => {
  const earningsRateElement = $('.earnings-rate');

  earningsRateElement.textContent = earningsRate;
}

export const showWinnerModal = (winnerStatistic, earningsRate) => {
  $('.modal-container').classList.remove('d-none');
  showWinningCount(winnerStatistic);
  showEarningsRate(earningsRate);
};
