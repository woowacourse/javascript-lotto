import { clearConatiner } from '../utils/Utils';

export function showModal() {
  const $modal = document.querySelector('.modal');
  $modal.classList.add('is-active');
}

export function closeModal() {
  const $modal = document.querySelector('.modal');
  $modal.classList.remove('is-active');
}

export default function paintModal($content) {
  const $modalContent = document.querySelector('.modal-content');
  clearConatiner($modalContent);
  $modalContent.appendChild($content);

  showModal();
}
