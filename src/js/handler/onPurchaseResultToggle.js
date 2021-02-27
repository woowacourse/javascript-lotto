import {
  renderPurchaseResultSectionColAlign,
  renderPurchaseResultSectionRowAlign,
} from '../view/viewPurchaseResultSection.js';

export const onPurchaseResultToggle = ({ target }) => {
  target.checked
    ? renderPurchaseResultSectionColAlign()
    : renderPurchaseResultSectionRowAlign();
};
