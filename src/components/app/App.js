import './global.css';
import './app.css';

import Component from '../core/Component';
import PurchaseSection from '../purchaseSection/PurchaseSection';
import TitleSection from '../titleSection/TitleSection';
import LottoResultModal from '../lottoResultModal/LottoResultModal';

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

  lottoResultModalOpen() {
    const $lottoNumberError = document.getElementById('lottoNumberError');
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultModal = document.getElementById('lottoResultModal');
    document.body.style.overflow = 'hidden';
    $lottoNumberError.classList.add('hidden');
    $modalBackground.classList.remove('hidden');
    $lottoResultModal.classList.remove('hidden');
  }
}

export default App;
