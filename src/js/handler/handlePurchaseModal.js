import { $, $$ } from '../utils/querySelector.js';
import { isDuplicate, isValidRange, isEqual } from '../utils/validator.js';
import { ERR_MESSAGE } from '../utils/constant.js';
import { closeModal } from '../utils/setProperty.js';
import { renderSelfResultTable } from '../view/viewPurchaseModal.js';
const selfTicketsNumbers = [];


  if (target.id === 'purchase-modal__self-input-form') {
    if (isEqual(lotto.getAmount(), selfTicketsNumbers.length)) {
      return alert(ERR_MESSAGE.LOTTO.OVER_PURCHASE);
    }

    const selfNumbers = [...$$('.self-number')]
      .map((selfNumber) => Number(selfNumber.value))
      .sort((a, b) => a - b);

    if (!isValidRange(selfNumbers)) {
      return alert(ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE);
    }

    if (isDuplicate(selfNumbers)) {
      return alert(ERR_MESSAGE.WINNING_NUMBER.DUPLICATE);
    }

    selfTicketsNumbers.push(selfNumbers);
    renderSelfResultTable(selfTicketsNumbers.length, selfNumbers);

    $$('.self-number').forEach((selfNumber) => {
      selfNumber.value = '';
    });
  }
};
