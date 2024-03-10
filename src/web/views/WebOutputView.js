import { $ } from '../../utils/querySelector';

const WebOutputView = {
  printMessage(target, message) {
    if (target.classList.contains('error')) {
      target.classList.remove('error');
    }
    target.innerHTML = message;
  },

  printError(target, message) {
    target.classList.add('error');
    target.innerHTML = message;
  },

  reset(target) {
    target.innerHTML = '';
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
