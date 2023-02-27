import lottoTemplate from './lottoTemplate';

export default class LottoListView {
  constructor() {
    this.$lottoListSection = document.querySelector('#lotto-list-section');
    this.$lottoQuantity = document.querySelector('#lotto-quantity');
    this.$lottoItemContainer = document.querySelector('#lotto-item-container');
    this.connectEvents();
  }

  connectEvents() {}

  showTicketContainer() {
    this.$lottoListSection.classList.replace('hidden', 'show');
  }

  hideTicketContainer() {
    this.$lottoListSection.classList.replace('show', 'hidden');
  }

  reloadView() {
    this.hideTicketContainer();
    this.$lottoItemContainer.textContent = '';
    this.$lottoQuantity.textContent = '';
  }

  showTicketCount(lottoQuantity) {
    this.$lottoQuantity.textContent = lottoQuantity;
  }

  showLottoList(eachLottoNumbers) {
    this.$lottoItemContainer.insertAdjacentHTML(
      'beforeend',
      eachLottoNumbers.map((lotto) => lottoTemplate(lotto)).join('')
    );
  }

  renderLottoList(lottoQuantity, eachLottoNumbers) {
    this.reloadView();
    this.showTicketContainer();
    this.showTicketCount(lottoQuantity);
    this.showLottoList(eachLottoNumbers);
  }
}
