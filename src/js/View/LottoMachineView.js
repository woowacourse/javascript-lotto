import { $ } from '../utils/util';
import { lottoListTemplate, lottoTotalNumber } from './template';

export default class LottoMachineView {
  constructor() {
    this.lottoListDisplay = {
      icon: this.showLottoIconList,
      number: this.showLottoNumberList,
    };
  }

  switchLottoList(displayState) {
    this.lottoListDisplay[displayState ? 'number' : 'icon']();
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
