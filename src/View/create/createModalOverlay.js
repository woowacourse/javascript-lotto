function createModalOverlay() {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');
  modalOverlay.style.display = 'block';

  document.querySelector('.container').appendChild(modalOverlay);

  return modalOverlay;
}
export default createModalOverlay;
