import { DOM } from '../../DOM/dom.js';
import { validatePurchasePrice } from '../../validation/validatePurchasePrice.js';
import { errorHandler } from '../../utils/errorHandler.js';

export const handlePurchase = (event, callback) => {
  event.preventDefault();
  const formData = new FormData(DOM.purchaseForm);
  const purchasePrice = Number(formData.get('purchase-input'));

  try {
    validatePurchasePrice(purchasePrice);
    callback(purchasePrice);
  } catch (error) {
    errorHandler(error.message);
  }
};
