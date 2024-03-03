export const MODAL_EVENTS = {
  open: 'openModal',
  close: 'closeModal',
};

export const MODAL_SELECTOR = 'app-modal';

export default class Modal extends HTMLElement {
  #isOpen = false;

  #closeBtn;

  #content;

  #header;

  #body;

  constructor() {
    super();

    const template = document.getElementById('template-modal');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#closeBtn = this.querySelector('.modal-close-btn');
    this.#content = this.querySelector('.modal-content');
    this.#header = this.querySelector('.modal-header');
    this.#body = this.querySelector('.modal-content');
  }

  connectedCallback() {
    this.#closeBtn.addEventListener('click', this.#closeModal.bind(this));
  }

  openModal() {
    this.#isOpen = true;
    this.style.display = 'block';
  }

  #closeModal() {
    this.#isOpen = false;
    this.style.display = 'none';
  }
}
