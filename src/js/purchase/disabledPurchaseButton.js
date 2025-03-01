import { $ } from '../../util/selector.js';

const disablePurchaseButton = () => {
  const purchaseButton = $('#purchase-form button');
  purchaseButton.disabled = true;
  purchaseButton.style.backgroundColor = '#ccc';
  purchaseButton.style.cursor = 'not-allowed';
};

export default disablePurchaseButton;
