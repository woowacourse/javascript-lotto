import { $ } from '../utils/dom.js';

export const handleToggleButtonClick = e => {
  if (!e.target.classList.contains(`onoff-switch`)) {
    return;
  }
  $('.purchased-lotto-list').classList.toggle('is-active');
};
