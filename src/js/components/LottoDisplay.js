import { lottoManager } from './App.js';
import { isEmptyArray } from '../utils/common.js';
import { $ } from '../utils/dom.js';

export default class LottoDisplay {
  constructor() {
    this.initState();
    this.subscribeAction();
    this.selectDOM();
    this.bindEvent();
  }

  initState() {
    this.isToggled = false;
  }

  subscribeAction() {
    lottoManager.subscribe(this.render.bind(this));
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

  onToggleSwitch({ target: { checked } }) {
    this.setIsToggled({ isToggled: checked });
  }

  createTotalLottoCountHTML() {
    return `총 ${lottoManager.lottos.length}개를 구매하였습니다.`;
  }

  createLottoHTML() {
    const lottoNumbersHTML = numbers =>
      this.isToggled
        ? `<span data-test="lotto-numbers" class="text-2xl ml-4">${numbers.join(
            ', ',
          )}</span>`
        : '';

    return lottoManager.lottos
      .map(
        ({ numbers }) =>
          `<span data-test="lotto" class="mx-1 text-4xl d-flex items-center justify-center">🎟️ ${lottoNumbersHTML(
            numbers,
          )}</span>`,
      )
      .join('');
  }

  setIsToggled({ isToggled }) {
    this.isToggled = isToggled ?? this.isToggled;

    this.render();
  }

  render() {
    if (isEmptyArray(lottoManager.lottos)) {
      this.$target.classList.add('d-none');
      return;
    }

    this.$target.classList.remove('d-none');
    this.$lottoCount.innerHTML = this.createTotalLottoCountHTML();
    this.$lottoDisplayArea.innerHTML = this.createLottoHTML();
  }
}
