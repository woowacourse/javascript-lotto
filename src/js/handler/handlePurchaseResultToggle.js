import {
  renderPurchaseResultSectionColAlign,
  renderPurchaseResultSectionRowAlign,
} from '../view/viewPurchaseResultSection.js';

export const handlePurchaseResultToggle = ({ target }) => {
  target.checked
    ? renderPurchaseResultSectionColAlign()
    : renderPurchaseResultSectionRowAlign();
};
