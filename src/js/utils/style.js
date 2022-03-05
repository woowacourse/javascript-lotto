import { $ } from './dom';

export const deactivateForm = (enable, selectorArray) => {
  selectorArray.forEach((selector) => {
    const element = $(selector);
    element.setAttribute('disabled', enable);

    element.tagName === 'BUTTON' && enable
      ? element.classList.add('button-dimmed')
      : element.classList.remove('button-dimmed');
  });
};
