import ModalContent from './ModalContent.js';

export default function Modal() {
  const container = document.createElement('div');
  container.setAttribute('id', 'modal-container');

  container.appendChild(ModalContent());

  return container;
}
