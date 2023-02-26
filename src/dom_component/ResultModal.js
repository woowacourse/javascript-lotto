import { QuerySelector } from '../constants/Dom';
import { $ } from '../utils/DomUtils';
import Convertor from '../utils/Convertor';

class ResultModal {
  constructor() {
    this.resultModal = $(QuerySelector.RESULT_MODAL);
    this.closeButton = $(QuerySelector.MODAL_CLOSE_BUTTON);
    this.restartButton = $(QuerySelector.RESTART_BUTTON);
  }

  #paintRankEl(ranks) {
    const rank = [1, 2, 3, 4, 5];
    rank.forEach((each) => {
      $(`.rank_${each}`).innerText = Convertor.resultNumber(ranks[each]);
    });
  }

  #paintProfitRate(profitRate) {
    const profitMessage = Convertor.profitRateResult(profitRate);
    $(QuerySelector.PROFIT_MESSAGE).innerText = profitMessage;
  }

  render(rank, profitRate) {
    this.#paintRankEl(rank);
    this.#paintProfitRate(profitRate);

    this.resultModal.showModal();
  }

  activate(resetGame) {
    window.addEventListener('click', (e) => {
      if (e.target.tagName === 'DIALOG') {
        this.#close();
      }
    });

    this.closeButton.addEventListener('click', () => {
      this.#close();
    });

    this.restartButton.addEventListener('click', () => {
      this.#close();
      resetGame();
    });
  }

  #close() {
    this.resultModal.close();
  }
}

export default new ResultModal();
