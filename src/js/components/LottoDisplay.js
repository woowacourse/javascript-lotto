import { $, $$ } from '../utils/dom.js';
import { store } from './App.js';
import Component from '../core/Component.js';

export default class LottoDisplay extends Component {
  mainTemplate() {
    return `
    <div class="d-flex">
      <label id="total-lotto-count" class="flex-auto my-0"></label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" class="lotto-numbers-toggle-button" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
    <div id="lotto-display-area" class="d-flex flex-wrap">
    </div>
    `;
  }

  setup() {
    this.isToggled = false;
    store.subscribe(this.render.bind(this));
  }

  selectDOM() {
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
    $$('.lotto-numbers').forEach($lottoNumbers => {
      $lottoNumbers.classList.toggle('d-none');
    });
  }

  createTotalLottoCountHTML(lottoCount) {
    return `총 ${lottoCount}개를 구매하였습니다.`;
  }

  createLottoHTML(numbers) {
    return `<span data-test="lotto" class="mx-1 text-4xl d-flex items-center justify-center">
              🎟️ <span class="lotto-numbers d-none text-2xl ml-4">${numbers.join(
                ', ',
              )}</span>
            </span>`;
  }

  render(prevStates, states) {
    //fail case
    if (states === undefined) {
      this.$target.innerHTML = this.mainTemplate();
      return;
    }

    if (states.lottos.length === 0) {
      this.$target.classList.add('d-none');
      this.$lottoDisplayArea.innerHTML = '';
      this.$toggleButton.checked = false;
      return;
    }

    // success case
    if (prevStates.lottos !== states.lottos) {
      this.$target.classList.remove('d-none');
      this.$lottoCount.innerHTML = this.createTotalLottoCountHTML(
        states.lottos.length,
      );
      this.$lottoDisplayArea.innerHTML = states.lottos
        .map(lottoNumbers => this.createLottoHTML(lottoNumbers))
        .join('');
    }
  }
}
