import './LottoResultModal.css';
import Component from '../core/Component';
import dom from '../../utils/dom';
import modal from '../../utils/dom/modal';
import eventHandler from '../../utils/dom/eventHandler';
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
    dom.$('#closeButton').addEventListener('click', this.handleCloseModal);
    dom.$('#restartButton').addEventListener('click', this.handleClickRestart);
  }

  handleCloseModal() {
    modal.close();
  }

  handleClickRestart() {
    modal.close();
    eventHandler.restart();
  }
}

export default LottoResultModal;
