import { enableButton } from '../../util/web/buttonState.js';
import { closeModal } from '../../util/web/modal.js';
import { $, $all } from '../../util/web/selector.js';

export const resetUI = () => {
  $all('form').forEach((form) => form.reset());

  $('.purchase-form__result').innerHTML = '';

  enableButton($('.purchase-form__button'));
  closeModal($('.modal'));
};
