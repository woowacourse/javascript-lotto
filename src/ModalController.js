import { $ } from './util/web/dom';

class ModalController {
  constructor() {
    this.background = $('#modal-background');
    this.modal = $('#modal');

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.background.addEventListener('click', this.onCloseModal.bind(this));
  }

  showModal() {
    this.background.classList.remove('hidden');
  }

  onCloseModal(event) {
    if (!this.#isCloseEventId(event.target.id)) return;

    this.modal.innerHTML = '';
    this.background.classList.add('hidden');
  }

  #isCloseEventId(id) {
    return id === 'modal-background' || id === 'modal-close-button';
  }
}

export default ModalController;
