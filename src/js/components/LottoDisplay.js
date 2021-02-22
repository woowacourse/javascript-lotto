import { $ } from '../utils/dom.js';

export default class LottoDisplay {
  constructor(props) {
    this.props = props;

    this.setup();
    this.initState();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.render.bind(this));
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

  onToggleSwitch({ target: { checked } }) {
    this.setState({ isToggled: checked });
  }

  createTotalLottoCountHTML() {
    return `총 ${this.lottoManager.lottos.length}개를 구매하였습니다.`;
  }

  createLottoHTML() {
    const lottoNumbersHTML = numbers =>
      this.isToggled
        ? `<span data-test="lotto-numbers" class="text-2xl ml-4">${numbers.join(
            ', ',
          )}</span>`
        : '';

    return this.lottoManager.lottos
      .map(
        ({ numbers }) =>
          `<span data-test="lotto" class="mx-1 text-4xl d-flex items-center justify-center">🎟️ ${lottoNumbersHTML(
            numbers,
          )}</span>`,
      )
      .join('');
  }

  setState({ isToggled }) {
    this.isToggled = isToggled ?? this.isToggled;

    this.render();
  }

  render() {
    this.lottoManager.lottos.length
      ? this.$target.classList.remove('d-none')
      : this.$target.classList.add('d-none');

    this.$lottoCount.innerHTML = this.createTotalLottoCountHTML();
    this.$lottoDisplayArea.innerHTML = this.createLottoHTML();
  }
}
