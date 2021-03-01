import { $costInput, $$correctNumberInputs } from '../../elements.js';
import purchaseSection from './purchaseSection.js';
import resultSection from './resultSection.js';
import winningSection from './winningSection.js';
import modalSection from './modalSection.js';

export default class View {
  constructor() {
    this.purchaseSection = purchaseSection;
    this.resultSection = resultSection;
    this.winningSection = winningSection;
    this.modalSection = modalSection;
  }

  init() {
    this.modalSection.closeResultModal();
    this.resultSection.hidePurchaseResult();
    this.winningSection.hideCorrectNumberInputForm();
    $costInput.value = '';
    $$correctNumberInputs.forEach(
      ($correctNumberInput) => ($correctNumberInput.value = ''),
    );
  }

  showMessage(message) {
    alert(message);
  }
}
