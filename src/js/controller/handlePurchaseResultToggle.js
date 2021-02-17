import {
  renderPurchaseResultSectionColAlign,
  renderPurchaseResultSectionRowAlign,
} from '../view/viewPurchaseResultSection.js';

export const handlePurchaseResultToggle = ({ target }) => {
  if (target.checked) {
    return renderPurchaseResultSectionColAlign();
  }

  renderPurchaseResultSectionRowAlign();
};
