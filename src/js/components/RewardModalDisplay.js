import { lottoManager } from './App.js';
import { isEmptyObject } from '../utils/common.js';
import { $, $$ } from '../utils/dom.js';

export default class RewardModalDisplay {
  constructor() {
    this.subscribeAction();
    this.selectDOM();
    this.bindEvent();
  }

  subscribeAction() {
    lottoManager.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$target = $('.modal');
    this.$restartButton = $('#restart-btn');
    this.$winningCountTexts = $$('[data-prize]');
    this.$profitText = $('#total-profit');
    this.$closeButton = $('.modal-close');
  }

  bindEvent() {
    this.$restartButton.addEventListener('click', this.onRestart.bind(this));

    this.$closeButton.addEventListener('click', this.onModalClose.bind(this));
    this.$target.addEventListener('mousedown', ({ target }) => {
      if (target.closest('.modal-inner')) {
        return;
      }

      this.onModalClose();
    });
  }

  onRestart() {
    lottoManager.resetState();
  }

  onModalClose() {
    this.$target.classList.remove('open');
  }

  onModalShow() {
    this.$target.classList.add('open');
  }

  render() {
    if (isEmptyObject(lottoManager.winningResult)) {
      this.onModalClose();
      return;
    }

    this.onModalShow();
    this.$winningCountTexts.forEach($winningCountText => {
      const key = $winningCountText.getAttribute('data-prize');
      $winningCountText.textContent = `${lottoManager.winningResult[key]}개`;
    });
    this.$profitText.textContent = `당신의 총 수익률은 ${lottoManager
      .calculateProfitMargin()
      .toFixed(2)}% 입니다.`;
  }
}
