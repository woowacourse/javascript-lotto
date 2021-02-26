import { $ } from '../utils/querySelector.js';
import {
  renderAutoPurchaseForm,
  renderManualPurchaseForm,
} from '../view/viewPurchaseSection.js';

const setAutoManualPurchaseForm = () => {
  renderAutoPurchaseForm();
  $('#auto-purchase-input-form__input').focus();
};

const setManualPurchaseForm = () => {
  renderManualPurchaseForm();
  $('.choose-number').focus();
};

export const onPurchaseTypeToggle = ({ target }) => {
  target.checked ? setManualPurchaseForm() : setAutoManualPurchaseForm();
};
