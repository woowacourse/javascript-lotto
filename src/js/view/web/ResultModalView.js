import { $ } from '../../util/web/querySelector.js';
import { GAME_VALUE } from '../../constants/index.js';

class ResultModalView {
  #submitRestart;

  constructor(controllerFunction) {
    this.#submitRestart = controllerFunction;
    this.#setListeners();
  }

  displayResult(gameData, rate) {
    this.show();
    this.#displayPrizeResult(gameData);
    this.#displayRateResult(rate);
  }

  show() {
    $('#resultModal').classList.remove('hidden');
  }

  hide() {
    $('#resultModal').classList.add('hidden');
  }

  #displayPrizeResult(gameData) {
    ['fifth', 'fourth', 'third', 'second', 'first'].forEach((rank, index) => {
      const currentIndex = 4 - index;
      $(`#${rank}PrizeMoney`).innerText = (
        gameData[rank] * GAME_VALUE.PRIZE[currentIndex]
      ).toLocaleString();
      $(`#${rank}PrizeCount`).innerText = gameData[rank];
    });
  }

  #displayRateResult(rate) {
    $('#rateResult').innerText = `당신의 총 수익률은 ${rate.toLocaleString()} %입니다.`;
  }

  #setListeners() {
    $('#modalBackground').addEventListener('click', () => {
      this.hide();
    });

    $('#modalCloseButton').addEventListener('click', () => {
      this.hide();
    });

    $('#restartButton').addEventListener('click', () => {
      this.hide();
      this.#submitRestart();
    });
  }
}

export default ResultModalView;
