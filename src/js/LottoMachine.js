import { LOTTO_PRICE, SELECTOR } from './constants/constants';
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
    $(SELECTOR.CHARGE_SUBMIT_FORM).addEventListener('submit', this.onSubmitCharge.bind(this));
    $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).addEventListener('click', this.reverseLottoStyle.bind(this));
  }

  onSubmitCharge(event) {
    event.preventDefault();
    const chargeInputNumber = Number($(SELECTOR.CHARGE_INPUT).value);
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

  reverseLottoStyle() {
    const style = $(SELECTOR.SHOW_NUMBER_TOGGLE_INPUT).checked ? 'number' : 'icon';
    this.lottoMachineView.switchLottoListStyle(style);
  }
}
