import View from './View.js';
import { $ } from '../utils/dom.js';

export default class PurchaseTypeSelectView extends View {
  constructor($element) {
    super($element);
    this.currAutoPurchase = true;
    this.bindSelectTypeEvent();
  }

  bindSelectTypeEvent() {
    $('#auto-btn').addEventListener('click', () =>
      this.handlePurchaseType(true)
    );
    $('#manual-btn').addEventListener('click', () =>
      this.handlePurchaseType(false)
    );
  }

  handlePurchaseType(isAutoPurchase) {
    this.emit('selectType', isAutoPurchase);
    this.switchPurchaseType(isAutoPurchase);
  }

  switchPurchaseType(isAutoPurchase) {
    if (this.currAutoPurchase === isAutoPurchase) return;

    this.currAutoPurchase = isAutoPurchase;
    $('#auto-btn').classList.toggle('btn-default');
    $('#auto-btn').classList.toggle('btn-cyan');
    $('#manual-btn').classList.toggle('btn-default');
    $('#manual-btn').classList.toggle('btn-cyan');
  }
}
