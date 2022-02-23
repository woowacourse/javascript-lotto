import { $ } from '../utils/dom.js';

export const handleToggleButtonClick = e => {
  if (!e.target.classList.contains(`toggle-button`)) {
    return;
  }
  $('.purchased-lotto-list').classList.toggle('is-active');
  $('.toggle-button').classList.toggle('is-active');
};
