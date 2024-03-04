import { $ } from '../utils/dom.js';

export function openModal() {
  $('#modal-wrapper').classList.remove('hidden-modal');
  $('#modal-wrapper').classList.add('modal-wrapper');
}

export function closeModal() {
  $('#modal-wrapper').classList.add('hidden-modal');
  $('#modal-wrapper').classList.remove('modal-wrapper');
}
