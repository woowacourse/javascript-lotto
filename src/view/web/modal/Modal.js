import ModalContent from './ModalContent.js';

export default function Modal() {
  const container = document.createElement('div');
  container.setAttribute('id', 'modal-container');

  const dimmer = document.createElement('div');
  dimmer.setAttribute('id', 'dimmer');

  container.appendChild(dimmer);
  container.appendChild(ModalContent());

  return container;
}
