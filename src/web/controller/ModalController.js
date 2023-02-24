import { $ } from '../utils/dom';

class ModalController {
  constructor() {
    this.background = $('#modal-background');
    this.modal = $('#modal');

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.background.addEventListener('click', this.onClose.bind(this));
  }

  show(template) {
    this.background.classList.remove('hidden');
    this.modal.innerHTML = template;
  }

  onClose(event) {
    if (!this.#isCloseEventId(event.target.id)) return;

    this.reset();
  }

  reset() {
    this.modal.innerHTML = '';
    this.background.classList.add('hidden');
  }

  #isCloseEventId(id) {
    return id === 'modal-background' || id === 'modal-close-button';
  }
}

export default ModalController;
