import { $, $$ } from '../utils/dom.js';

export default class RewardModalDisplay {
  constructor(props) {
    this.props = props;
    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$target = $('.modal');
    this.$restartButton = $('#restart-btn');
    this.$winningCountTexts = $$('[data-td]');
    this.$profitText = $('[data-p=profit]');
    this.$closeButton = $('.modal-close');
  }

  bindEvent() {
    this.$closeButton.addEventListener('click', this.onModalClose.bind(this));
    this.$target.addEventListener(
      'mousedown',
      this.onClickOutsideModal.bind(this),
    );
    this.$restartButton.addEventListener('click', this.onRestart.bind(this));
  }

  onRestart() {
    this.lottoManager.resetState();
  }

  onClickOutsideModal(e) {
    if (e.target.closest('.modal-inner')) {
      return;
    }
    this.onModalClose();
  }

  onModalShow() {
    this.$target.classList.add('open');
  }

  onModalClose() {
    this.$target.classList.remove('open');
  }

  render() {
    if (Object.keys(this.lottoManager.winningCount).length !== 0) {
      this.$winningCountTexts.forEach($winningCountText => {
        const key = $winningCountText.getAttribute('data-td');
        $winningCountText.textContent = `${this.lottoManager.winningCount[key]}개`;
      });
      this.$profitText.textContent = `당신의 총 수익률은 ${this.lottoManager.calculateProfitMargin()}% 입니다.`;

      this.onModalShow();
    } else {
      this.onModalClose();
    }
  }
}
