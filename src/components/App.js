import modal from '../utils/dom/modal';
import Component from './Component';

class LottoApp extends Component {
  render() {
    this.innerHTML = `
        <title-section id="titleSection"></title-section>
        <purchase-section id="purchaseSection"></purchase-section>
        <section id="purchaseResultSection"></section>
        <winning-number-section id="winningNumberSection" class="hidden"></winning-number-section>
        <lotto-result-modal id="lottoResultModal" class="hidden"></lotto-result-modal>
        `;
  }
}

const handleClickOuterModal = e => {
  if (e.target.id === 'modalBackground') modal.close();
};

document.body.addEventListener('click', handleClickOuterModal);

customElements.define('lotto-app', LottoApp);
