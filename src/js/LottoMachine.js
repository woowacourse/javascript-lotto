import { LOTTO_PRICE } from './constants/constants';
import { $, divider } from './utils/util';
import validateCharge from './validation';

import LottoManager from './LottoManager';
import LottoMachineView from './view/LottoMachineView';

export default class LottoMachine {
  constructor() {
    this.setEvent();
    this.lottoManager = new LottoManager();
    this.lottoMachineView = new LottoMachineView();
  }

  setEvent() {
    $('#charge-submit-form').addEventListener(
      'submit',
      this.onSubmitCharge.bind(this)
    );
    $('#show-number-toggle-input').addEventListener(
      'click',
      this.reverseLottoDisplayState.bind(this)
    );
  }

  onSubmitCharge(event) {
    event.preventDefault();
    const chargeInputNumber = Number($('#charge-input').value);
    try {
      validateCharge(chargeInputNumber);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.purchase(chargeInputNumber);
  }

  purchase(chargeInputNumber) {
    const { quotient: newLottoCount } = divider(chargeInputNumber, LOTTO_PRICE);
    this.lottoManager.generateNewLottos(newLottoCount);
    this.lottoMachineView.updateOnPurchase(this.lottoManager.lottos);
  }

  reverseLottoDisplayState() {
    const displayState = $('#show-number-toggle-input').checked;
    this.lottoMachineView.switchLottoList(displayState);
  }
}
