import { $ } from '../utils/dom.js';

export const toggleButton = () => {
  $('.purchased-lotto-main').classList.toggle('is-active');
  if ($('.checkbox').checked) {
    $('.checkbox').checked = false;
    return;
  }
  $('.checkbox').checked = true;
};
