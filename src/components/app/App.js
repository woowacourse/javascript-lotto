import './global.css';
import './app.css';
import WebLottoController from '../../controllers/WebLottoController';
import eventHandler from '../../utils/dom/eventHandler';
import modal from '../../utils/dom/modal';
import webInputView from '../../views/webInputView';
import Component from '../core/Component';
import LottoResultModal from '../lottoResultModal/LottoResultModal';
import PurchaseSection from '../purchaseSection/PurchaseSection';
import TitleSection from '../titleSection/TitleSection';
import WinningNumberSection from '../winningNumberSection/WinningNumberSection';

class App extends Component {
  template() {
    return `
      <section id="titleSection"></section>
      <section id="purchaseSection"></section>
      <section id="purchaseResultSection"></section>
      <section id="winningNumberSection" class="hidden"></section>
      <section id="lottoResultModal" class="hidden"></section>
    `;
  }

  mounted() {
    const { play, handleCloseModal, handleClickRestart } = this;
    const $titleSection = this.$target.querySelector('#titleSection');
    const $purchaseSection = this.$target.querySelector('#purchaseSection');
    const $winningNumberSection = this.$target.querySelector('#winningNumberSection');
    const $lottoResultModal = this.$target.querySelector('#lottoResultModal');

    new TitleSection($titleSection, {});
    new PurchaseSection($purchaseSection, {});
    new WinningNumberSection($winningNumberSection, {});
    new LottoResultModal($lottoResultModal, {
      handleCloseModal: handleCloseModal.bind(this),
      handleClickRestart: handleClickRestart.bind(this),
    });
  }

  setEvent() {
    document.body.addEventListener('click', e => {
      if (e.target.id === 'modalBackground') modal.close();
    });
  }

  // play() {
  //   const purchaseAmount = webInputView.readPurchaseAmount();
  //   if (!purchaseAmount) return;
  //   document.querySelector('.winningNumberInput').focus();
  //   const lottoController = new WebLottoController(purchaseAmount);
  //   lottoController.run();
  //   document.getElementById('lottoResultButton').addEventListener('click', lottoController.handleLottoResult);
  // }

  handleCloseModal() {
    modal.close();
  }

  handleClickRestart() {
    modal.close();
    eventHandler.restart();
  }
}

export default App;
