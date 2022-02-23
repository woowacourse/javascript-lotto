import { $ } from '../util';
import { lottoListTemplate, lottoTotalNumber } from './template';

export default class LottoMachineView {
  constructor() {
    this.LottoListDisplay = {
      Icon: this.showLottoIconList,
      Number: this.showLottoNumberList
    }
  }

  switchLottoList(displayState) {
    this.LottoListDisplay[displayState ? 'Number' : 'Icon']();
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