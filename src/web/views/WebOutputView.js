import { $ } from '../../utils/querySelector';
import ResultModal from '../Components/ResultModal';
import WinningNumbersForm from '../Components/WinningNumbersForm';

const WebOutputView = {
  printMessage(target, message) {
    if (target.classList.contains('error')) {
      target.classList.remove('error');
    }
    this.reset(target);
    target.insertAdjacentHTML('beforeend', message);
  },

  printError(target, message) {
    target.classList.add('error');
    this.reset(target);
    target.insertAdjacentHTML('beforeend', message);
  },

  reset(target) {
    target.replaceChildren();
  },

  renderLottoResult(rankList, profit) {
    const modalContainer = $('#lotto-result-modal-container');
    modalContainer.replaceChildren();
    modalContainer.insertAdjacentHTML('beforeend', ResultModal(rankList, profit));
  },

  renderWinningNumbersForm() {
    const winningNumbersForm = $('#winning-numbers-form');
    winningNumbersForm.replaceChildren();
    winningNumbersForm.insertAdjacentHTML('beforeend', WinningNumbersForm());
  },

  openModal() {
    const modal = $('#lotto-result-modal-section');
    modal.classList.remove('hide');
  },

  closeModal() {
    const modal = $('#lotto-result-modal-section');
    modal.classList.add('hide');
  },
};

export default WebOutputView;
