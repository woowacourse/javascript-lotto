import { $ } from './util';

export default class LottoMachineView {
  constructor() {
    this.setEvent();
    this.LottoListDisplay = {
      Icon: this.showLottoIconList,
      Number: this.showLottoNumberList
    }
  }

  setEvent() {
    $('#show-number-toggle-input').addEventListener('click', this.reverseLottoDisplayState.bind(this));
  }

  reverseLottoDisplayState() {
    const displayState = $('#show-number-toggle-input').checked;
    this.LottoListDisplay[displayState ? 'Number' : 'Icon']();
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