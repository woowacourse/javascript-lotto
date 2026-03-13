const Modal = {
  render(container, children) {
    const modalWrapper = document.createElement('div');
    const modalContainer = document.createElement('div');
    const closeButton = document.createElement('button');
    const closeButtonIcon = document.createElement('img');

    modalWrapper.classList.add('modal-wrapper');
    modalWrapper.addEventListener('click', this.handleOutsideClick);

    modalContainer.classList.add('modal-container');

    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', this.handleClose);

    closeButtonIcon.src = '/close.svg';
    closeButtonIcon.alt = '닫기';

    closeButton.appendChild(closeButtonIcon);
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(children);
    modalWrapper.appendChild(modalContainer);

    container.appendChild(modalWrapper);
  },

  handleOutsideClick() {
  },

  handleClose() {
  },
};

export default Modal;
