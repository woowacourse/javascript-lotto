import { $ } from '../utils/util';
import { lottoListTemplate, lottoTotalNumber } from './template';

export default class LottoMachineView {
  constructor() {
    this.showLottoList = {
      icon: this.showLottoIconList,
      number: this.showLottoNumberList,
    };
  }

  switchLottoListStyle(style) {
    this.showLottoList[style]();
  }

  updateOnPurchase(lottos) {
    $('#lotto-total-number').innerHTML = lottoTotalNumber(lottos.length);
    $('#lotto-list-icon').innerHTML = lottoListTemplate.icon(lottos.length);
    $('#lotto-list-number').innerHTML = lottoListTemplate.number(lottos);
  }

  showLottoIconList() {
    $('#lotto-list-icon').classList.remove('display-none');
    $('#lotto-list-number').classList.add('display-none');
  }

  showLottoNumberList() {
    $('#lotto-list-icon').classList.add('display-none');
    $('#lotto-list-number').classList.remove('display-none');
  }
}
