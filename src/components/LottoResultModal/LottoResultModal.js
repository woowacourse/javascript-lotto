import modal from '../../utils/dom/modal';
import eventHandler from '../../utils/dom/eventHandler';
import Component from '../Component';

class LottoResultModal extends Component {
  render() {
    this.innerHTML = `
        <div id="closeButtonWrapper">
            <button id="closeButton">x</button>
        </div>
        <div id="lottoResultTitleWrapper">
            <div class="title">🏆 당첨 통계 🏆</div>
        </div>
        <div id="lottoResultTable"></div>
        <button id="restartButton" class="button buttonFont">다시 시작하기</button>
        `;
  }

  disconnectedCallback() {
    const $closeButton = document.getElementById('closeButton');
    const $restartButton = document.getElementById('restartButton');
    $closeButton.addEventListener('click', this.handleCloseModal);
    $restartButton.addEventListener('click', this.handleClickRestart);
  }

  setEventHandler() {
    const $closeButton = document.getElementById('closeButton');
    const $restartButton = document.getElementById('restartButton');
    $closeButton.addEventListener('click', this.handleCloseModal);
    $restartButton.addEventListener('click', this.handleClickRestart);
  }

  handleCloseModal() {
    modal.close();
  }

  handleClickRestart() {
    modal.close();
    eventHandler.restart();
  }
}

customElements.define('lotto-result-modal', LottoResultModal);
