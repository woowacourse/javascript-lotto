import './LottoResultModal.css';
import Component from '../core/Component';
import dom from '../../utils/dom';
import { DOM_MESSAGE } from '../../constants/message';

class LottoResultModal extends Component {
  template() {
    return `
        <div id="closeButtonWrapper">
            <button id="closeButton">${DOM_MESSAGE.CLOSE_MODAL_BUTTON}</button>
        </div>
        <div id="lottoResultTitleWrapper">
            <div class="title">${DOM_MESSAGE.LOTTO_RESULT_TITLE}</div>
        </div>
        <div id="lottoResultTable"></div>
        <button id="restartButton" class="button buttonFont">${DOM_MESSAGE.LOTTO_RESTART_BUTTON}</button>
        `;
  }

  setEvent() {
    dom.$('#closeButton').addEventListener('click', () => this.close());
    dom.$('#restartButton').addEventListener('click', () => this.handleClickRestart());
    document.body.addEventListener('click', e => {
      if (e.target.id === 'modalBackground') this.close();
    });
  }

  close() {
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultModal = document.getElementById('lottoResultModal');
    document.body.style.overflow = 'unset';
    $modalBackground.classList.add('hidden');
    $lottoResultModal.classList.add('hidden');
  }

  restart() {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    const $winningNumberSection = document.getElementById('winningNumberSection');
    const $lottoNumberForm = document.getElementById('lottoNumberForm');
    const $purchaseLottoForm = document.getElementById('purchaseLottoForm');
    $purchaseLottoForm.reset();
    $purchaseSection.replaceChildren();
    $winningNumberSection.classList.add('hidden');
    $lottoNumberForm.reset();
  }

  handleClickRestart() {
    this.close();
    this.restart();
  }
}

export default LottoResultModal;
