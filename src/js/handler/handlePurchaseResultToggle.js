import {
  renderPurchaseResultSectionColAlign,
  renderPurchaseResultSectionRowAlign,
} from '../view/viewPurchaseResultSection.js';

export const handlePurchaseResultToggle = ({ target }) => {
  return target.checked
    ? renderPurchaseResultSectionColAlign()
    : renderPurchaseResultSectionRowAlign();
};
