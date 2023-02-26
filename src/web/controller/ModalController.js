class ModalController {
  #background;

  #container;

  constructor(background, container) {
    this.#background = background;
    this.#container = container;

    this.bindEventListeners();
  }

  getContainer() {
    return this.#container;
  }

  bindEventListeners() {
    this.#background.addEventListener('click', this.onClose.bind(this));
  }

  show(template) {
    this.#background.classList.remove('hidden');
    this.#container.innerHTML = template;
  }

  onClose(event) {
    if (!this.#isCloseEventId(event.target.id)) return;

    this.reset();
  }

  reset() {
    this.#container.innerHTML = '';
    this.#background.classList.add('hidden');
  }

  #isCloseEventId(id) {
    return id === 'modal-background' || id === 'modal-close-button';
  }
}

export default ModalController;
