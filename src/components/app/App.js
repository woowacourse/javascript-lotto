import './global.css';
import './app.css';

import modal from '../../utils/dom/modal';
import Component from '../core/Component';
import LottoResultModal from '../lottoResultModal/LottoResultModal';
import PurchaseSection from '../purchaseSection/PurchaseSection';
import TitleSection from '../titleSection/TitleSection';

class App extends Component {
  template() {
    return `
      <section id="titleSection"></section>
      <section id="purchaseSection"></section>
      <section id="purchaseResultSection"></section>
      <section id="winningNumberSection"></section>
      <section id="lottoResultModal" class="hidden"></section>
    `;
  }

  mounted() {
    const $titleSection = this.$target.querySelector('#titleSection');
    const $purchaseSection = this.$target.querySelector('#purchaseSection');
    const $lottoResultModal = this.$target.querySelector('#lottoResultModal');

    new TitleSection($titleSection);
    new PurchaseSection($purchaseSection);
    new LottoResultModal($lottoResultModal);
  }

  setEvent() {
    document.body.addEventListener('click', e => {
      if (e.target.id === 'modalBackground') modal.close();
    });
  }
}

export default App;
