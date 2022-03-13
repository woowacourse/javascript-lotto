import { $, $$ } from '../utils/dom';

class ModalView {
  constructor(controller) {
    this.controller = controller
    this.modalContainer = $('.modal-container');
    this.winningCountList = $$('.winning-count');
    this.earningsRate = $('.earnings-rate');

    $('.modal-closer', this.modalContainer).addEventListener('click', this.closeModal);
  }

  closeModal = () => {
    this.modalContainer.classList.add('d-none');
  };
  
  showWinningCount = winnersStatistic => {
    this.winningCountList.forEach((element, index) => {
      element.textContent = `${winnersStatistic[index]}개`;
    });
  };
  
  showEarningsRate = earningsRate => {
    this.earningsRate.textContent = earningsRate;
  };
  
  showWinnerModal = (winnerStatistic, earningsRate) => {
    this.modalContainer.classList.remove('d-none');
    this.showWinningCount(winnerStatistic);
    this.showEarningsRate(earningsRate);
  };
}


export default ModalView;
