import { $ } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';

export default class Modal {
  constructor(root) {
    this.root = root;
    this.bindEvents();
  }

  bindEvents() {
    this.root.addEventListener('click', this.handleDimmedClick.bind(this));
    $(SELECTORS.MODAL.CANCEL, this.root).addEventListener('click', this.close.bind(this));
  }

  open() {
    this.root.classList.add('open');
  }

  close() {
    this.root.classList.remove('open');
  }

  handleDimmedClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
