import { $costInput, $$correctNumberInputs } from '../../elements.js';
import costSection from './costSection.js';
import purchaseSection from './purchaseSection.js';
import resultSection from './resultSection.js';
import winningSection from './winningSection.js';
import modalSection from './modalSection.js';

export default class View {
  constructor() {
    this.costSection = costSection;
    this.purchaseSection = purchaseSection;
    this.resultSection = resultSection;
    this.winningSection = winningSection;
    this.modalSection = modalSection;
  }

  init() {
    this.costSection.init();
    this.modalSection.closeResultModal();
    this.resultSection.hidePurchaseResult();
    this.winningSection.hideCorrectNumberInputForm();
    $$correctNumberInputs.forEach(
      ($correctNumberInput) => ($correctNumberInput.value = ''),
    );
  }

  showMessage(message) {
    alert(message);
  }
}
