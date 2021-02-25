import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class ResultModalView extends View {
  constructor($element) {
    super($element);
    this.bindModalCloseEvent();
  }

  showModal(rankCounts, earningRate) {
    this.$element.classList.add('open');
    this.renderRanks(rankCounts);
    this.renderEarningRate(earningRate);
  }

  renderRanks(rankCounts) {
    $$('.match-count').forEach((el, idx) => {
      el.innerText = rankCounts[rankCounts.length - idx - 1];
    });
  }

  renderEarningRate(earningRate) {
    $('#profit').innerText = earningRate;
  }

  bindModalCloseEvent() {
    $('.modal-close').addEventListener('click', () => this.closeModal());
    $('main').addEventListener('click', () => this.closeModal());
    $('.modal-inner').addEventListener('click', e => e.stopPropagation());
    $('#reset-btn').addEventListener('click', () =>
      this.clickResetBtnHandler()
    );
  }

  clickResetBtnHandler() {
    this.closeModal();
    this.emit('clickResetBtn');
  }

  closeModal() {
    this.$element.classList.remove('open');
  }
}
