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
    $('#ticket-container').innerHTML = lottoListTemplate.icon(lottos.length);
    $('#ticket-list').innerHTML = lottoListTemplate.number(lottos);
  }

  showLottoIconList() {
    $('#ticket-container').classList.remove('display-none');
    $('#ticket-list').classList.add('display-none');
  }

  showLottoNumberList() {
    $('#ticket-container').classList.add('display-none');
    $('#ticket-list').classList.remove('display-none');
  }
}
