export const MODAL_SELECTOR = 'app-modal';

export default class Modal extends HTMLElement {
  #shadowRoot;

  #closeBtn;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'open' });
    this.#initDOM();

    this.#closeBtn = this.shadowRoot.querySelector('.close');
  }

  connectedCallback() {
    this.#closeBtn.addEventListener('click', this.closeModal.bind(this));
    this.closeModal();
  }

  disconnectedCallback() {
    this.#closeBtn.removeEventListener('click', this.closeModal.bind(this));
  }

  openModal() {
    this.style.display = 'block';
  }

  closeModal() {
    this.style.display = 'none';
  }

  #initDOM() {
    const template = document.getElementById('template-modal');
    const content = template.content.cloneNode(true);
    this.#shadowRoot.appendChild(content);
  }
}
