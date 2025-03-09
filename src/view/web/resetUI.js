import { $all, $ } from '../../util/web/selector.js';
import { enableButton } from './buttonState.js';
import { closeModal } from './ModalView.js';

export const resetUI = () => {
  $all('form').forEach((form) => form.reset());

  $('.purchase-form__result').innerHTML = '';

  enableButton($('.purchase-form__button'));
  closeModal($('.modal'));
};
