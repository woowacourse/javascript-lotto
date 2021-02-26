import { $ } from '../utils/querySelector.js';
import { disabledElement } from '../utils/setProperty.js';
import { ERR_MESSAGE, MESSAGE, VALUE } from '../utils/constant.js';
import { renderPurchaseSection } from '../view/viewPurchaseSection.js';
import { showWinningNumberInputForm } from '../view/viewWinningNumberInputForm.js';

const isValidPrice = (price) => {
  return price >= VALUE.LOTTO.TICKET_PRICE;
};

export const handlePurchasePriceSubmit = (lotto) => {
  const purchasePrice = $('#purchase-price-input-form__input').value;
  const smallChange = purchasePrice % VALUE.LOTTO.TICKET_PRICE;

  if (!isValidPrice(purchasePrice)) {
    alert(ERR_MESSAGE.LOTTO.INVALID_PRICE);
    return;
  }

  if (smallChange) {
    alert(MESSAGE.LOTTO.SMALL_CHANGE(smallChange));
  }

  lotto.setPurchasePrice(purchasePrice - smallChange);
  lotto.setPurchaseBudget(purchasePrice - smallChange);

  showWinningNumberInputForm();
  renderPurchaseSection(lotto);
  disabledElement($('#purchase-price-input-form__button'));
  $('#auto-purchase-input-form__input').focus();
};
