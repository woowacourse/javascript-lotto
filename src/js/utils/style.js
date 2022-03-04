import { $ } from './dom';

export const deactivateForm = (enable, selectorArray) => {
  selectorArray.forEach((selector) => {
    $(selector).setAttribute('disabled', enable);
  });
};
