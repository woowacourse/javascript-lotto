import { $, $$ } from '../utils/dom.js';
import { store } from '../index.js';
import Component from '../core/Component.js';
import Input from './Input/Input.js';

export default class LottoDisplay extends Component {
  initRender() {
    this.$target.innerHTML = `
    <div class="d-flex">
      <label id="total-lotto-count" class="flex-auto my-0"></label>
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          ${new Input({
            type: 'checkbox',
            classes: ['lotto-numbers-toggle-button'],
          }).getTemplate()}
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

  lottoCountText(lottoCount) {
    return `총 ${lottoCount}개를 구매하였습니다.`;
  }

  lottoTemplate(numbers) {
    return `<span data-test="lotto" class="mx-1 text-4xl d-flex items-center justify-center">
              🎟️ <span class="lotto-numbers d-none text-2xl ml-4">${numbers.join(
                ', ',
              )}</span>
            </span>`;
  }

  clearView() {
    this.$target.classList.add('d-none');
    this.$lottoDisplayArea.innerHTML = '';
    this.$toggleButton.checked = false;
  }

  updateLottoView(lottos) {
    this.$target.classList.remove('d-none');
    this.$lottoCount.innerHTML = this.lottoCountText(lottos.length);
    this.$lottoDisplayArea.innerHTML = lottos
      .map(lottoNumbers => this.lottoTemplate(lottoNumbers))
      .join('');
  }

  render(prevStates, states) {
    if (states.lottos.length === 0) {
      this.clearView();
      return;
    }

    if (prevStates.lottos !== states.lottos) {
      this.updateLottoView(states.lottos);
    }
  }
}
