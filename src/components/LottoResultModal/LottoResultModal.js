import './LottoResultModal.css';
import Component from '../core/Component';

class LottoResultModal extends Component {
  template() {
    return `
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

  setEvent() {
    const { handleCloseModal, handleClickRestart } = this.props;
    const $closeBtn = this.$target.querySelector('#closeButton');
    const $restartBtn = this.$target.querySelector('#restartButton');
    $closeBtn.addEventListener('click', handleCloseModal);
    $restartBtn.addEventListener('click', handleClickRestart);
  }
}

export default LottoResultModal;
