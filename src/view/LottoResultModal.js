class LottoResultModal {
  constructor() {
    this.modal = document.getElementsByClassName('modal')[0];
    this.modalContainer = document.getElementsByClassName('modal-container')[0];
    this.closeButton = document.getElementById('close-button');
    this.closeButton.addEventListener('click', this.closeButtonHandler.bind(this));
  }

  toggleModal() {
    this.modalContainer.classList.toggle('hidden');
  }

  render() {
    this.toggleModal();
    this.modalContainer.style.backgroundColor = `rgba(0, 0, 0, 0.5)`;
  }

  closeButtonHandler() {
    this.toggleModal();
  }
}

export default LottoResultModal;
