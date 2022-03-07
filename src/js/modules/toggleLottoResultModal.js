import { $ } from '../utils/dom.js';

export default function toggleLottoResultModal() {
  $('.overlay').classList.toggle('is-active');
  $('.winning-rate-content-container').classList.toggle('is-active');
}
