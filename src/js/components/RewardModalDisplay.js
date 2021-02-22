import { $, $$ } from '../utils/dom.js';

export default class RewardModalDisplay {
  constructor(props) {
    this.props = props;
    this.setup();
    this.selectDOM();
  }

  selectDOM() {
    this.$target = $('.modal');
    this.$restartButton = $('#restart-btn');
    this.$winningCountTexts = $$('[data-td]');
    this.$profitText = $('[data-p=profit]');
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.render.bind(this));
  }
  onModalShow() {
    this.$target.classList.add('open');
  }

  onModalClose() {
    this.$target.classList.remove('open');
  }

  render() {
    if (this.lottoManager.winningCount) {
      this.$winningCountTexts.forEach($winningCountText => {
        const key = $winningCountText.getAttribute('data-td');
        $winningCountText.textContent = `${this.lottoManager.winningCount[key]}개`;
      });
      this.$profitText.textContent = `당신의 총 수익률은 ${this.lottoManager.calculateProfitMargin()}% 입니다.`;

      this.onModalShow();
    }
  }
}
