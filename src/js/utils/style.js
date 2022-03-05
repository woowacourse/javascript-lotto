import { $, $$ } from './dom';

export const deactivateForm = (selectorArray) => {
  selectorArray.forEach((selector) => {
    const element = $(selector);
    element.setAttribute('disabled', true);
    element.tagName === 'BUTTON' && element.classList.add('button-dimmed');
  });
};

export const activateForm = (selectorArray) => {
  selectorArray.forEach((selector) => {
    const element = $(selector);
    element.removeAttribute('disabled');
    element.tagName === 'BUTTON' && element.classList.remove('button-dimmed');
  });
};

export const resetInput = () => {
  $$('input').forEach((element) => {
    element.value = '';
  });
};
