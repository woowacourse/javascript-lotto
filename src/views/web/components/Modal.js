export const MODAL_EVENTS = {
  open: 'openModal',
  close: 'closeModal',
};

export const MODAL_SELECTOR = 'app-modal';

const styleText = `
  .modal {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: rgba(var(--color-grey-scale-5), 0.5);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    background-color: rgba(var(--color-grey-scale-1));
    padding: 1.6rem;
  }
  
  .close {
    /* cancel default style */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    /* appearance */
    background-color: transparent;
    border: none;

    /* text */
    line-height: 1.6rem;
    letter-spacing: 0.125rem;
    font-size: 2rem;
    font-weight: var(--weight-bold);
  }

  .close:hover {
    cursor: pointer;
  }
`;

export default class Modal extends HTMLElement {
  #shadowRoot;

  #closeBtn;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'open' });
    this.#initDOM();
    this.#initStyles();

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

  #initStyles() {
    const styles = document.createElement('style');
    styles.textContent = styleText;
    this.#shadowRoot.appendChild(styles);
  }
}
