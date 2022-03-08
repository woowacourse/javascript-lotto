import { $, $$ } from '../utils/util';
import { MATCH_RESULT_INDEX, PRIZE_MONEY } from '../constants/constants';

const CLASS_DISPLAY_NONE = 'display-none';

export default class WinningResultModalView {
  constructor(app) {
    this.app = app;
    this.resultModalArea = $('#result-modal-area', this.winningResultSection);
    this.resultModalCloseButton = $('#result-modal-close-button', this.resultModalArea);
    this.restartButton = $('#restart-button', this.resultModalArea);

    this.bindEvent();
  }

  bindEvent() {
    this.resultModalCloseButton.addEventListener('click', this.changeResultModalVisibility.bind(this));
    this.restartButton.addEventListener('click', this.onClickRestartButton.bind(this));
  }

  onClickRestartButton() {
    const restartEvent = new CustomEvent('restart', {});
    this.app.dispatchEvent(restartEvent);
  }
  
  initialize() {
    this.changeResultModalVisibility();
  }

  updateOnCheckWinningResult(winningResult){
    this.updateWinningResultModal(winningResult);
    this.changeResultModalVisibility();
  }

  changeResultModalVisibility() {
    return this.resultModalArea.classList.contains(CLASS_DISPLAY_NONE)
      ? this.resultModalArea.classList.remove(CLASS_DISPLAY_NONE)
      : this.resultModalArea.classList.add(CLASS_DISPLAY_NONE);
  }

  updateWinningResultModal({ matchResult, profitRatio }) {
    $$('.match-result', this.resultModalArea).forEach((resultRow) => {
      $('.match-count', resultRow).innerText = `${matchResult[MATCH_RESULT_INDEX[resultRow.dataset.matchCount]]}개`;
      $('.prize-money', resultRow).innerText = PRIZE_MONEY[resultRow.dataset.matchCount].toLocaleString();
    })
    $('#profit-ratio', this.resultModalArea).innerText = Math.round(profitRatio);
  }

}
