import { $, $$ } from '../utils/dom.js';
import { lottoManager } from './App.js';

export default class LottoDisplay {
  constructor(props) {
    this.props = props;

    this.setup();
    this.initState();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    lottoManager.subscribe(this.render.bind(this));
  }

  initState() {
    this.isToggled = false;
  }

  selectDOM() {
    this.$target = $('#lotto-display-container');
    this.$toggleButton = $('.lotto-numbers-toggle-button');
    this.$lottoCount = $('#total-lotto-count');
    this.$lottoDisplayArea = $('#lotto-display-area');
  }

  bindEvent() {
    this.$toggleButton.addEventListener(
      'change',
      this.onToggleSwitch.bind(this),
    );
  }

  onToggleSwitch() {
    console.log(1);
    $$('.lotto-numbers').forEach($lottoNumbers => {
      $lottoNumbers.classList.toggle('d-none');
    });
  }

  createTotalLottoCountHTML() {
    return `총 ${lottoManager.lottos.length}개를 구매하였습니다.`;
  }

  createLottoHTML(numbers) {
    return `<span data-test="lotto" class="mx-1 text-4xl d-flex items-center justify-center">
              🎟️ <span class="lotto-numbers d-none text-2xl ml-4">${numbers.join(
                ', ',
              )}</span>
            </span>`;
  }

  render() {
    if (lottoManager.lottos.length > 0) {
      this.$target.classList.remove('d-none');
      this.$lottoCount.innerHTML = this.createTotalLottoCountHTML();
      this.$lottoDisplayArea.innerHTML = lottoManager.lottos
        .map(({ numbers }) => this.createLottoHTML(numbers))
        .join('');
    } else {
      this.$target.classList.add('d-none');
      this.$toggleButton.checked = false;
    }
  }
}
