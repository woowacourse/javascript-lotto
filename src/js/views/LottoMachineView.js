import { $ } from '../utils/util';
import { lottoListTemplate, lottoTotalNumber } from './template';
import { SELECTOR } from '../constants/constants';

export default class LottoMachineView {
  constructor() {
    this.showLottoList = {
      icon: this.showLottoIconList,
      number: this.showLottoNumberList,
    };
  }

  updateChargeInput(value) {
    $(SELECTOR.CHARGE_INPUT).value = value;
  }

  switchLottoListStyle(style) {
    this.showLottoList[style]();
  }

  updateLottoList(lottos) {
    $(SELECTOR.LOTTO_TOTAL_NUMBER).innerHTML = lottoTotalNumber(lottos.length);
    $(SELECTOR.LOTTO_LIST_ICON).innerHTML = lottoListTemplate.icon(lottos.length);
    $(SELECTOR.LOTTO_LIST_NUMBER).innerHTML = lottoListTemplate.number(lottos);
  }

  showLottoIconList() {
    $(SELECTOR.LOTTO_LIST_ICON).classList.remove('display-none');
    $(SELECTOR.LOTTO_LIST_NUMBER).classList.add('display-none');
  }

  showLottoNumberList() {
    $(SELECTOR.LOTTO_LIST_ICON).classList.add('display-none');
    $(SELECTOR.LOTTO_LIST_NUMBER).classList.remove('display-none');
  }
}
