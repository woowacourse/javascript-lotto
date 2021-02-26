import {
  renderAutoPurchaseForm,
  renderManualPurchaseForm,
} from '../view/viewPurchaseSection.js';

export const onPurchaseTypeToggle = ({ target }) => {
  target.checked ? renderManualPurchaseForm() : renderAutoPurchaseForm();
};
