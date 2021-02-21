import { $ } from '../utils/dom.js';

export default class LottoDisplay {
  constructor(props) {
    this.props = props;

    this.initState();
    this.selectDOM();
    this.bindEvent();
  }

  initState() {
    this.lottos = this.props.lottos;
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
    return `총 ${this.lottos.length}개를 구매하였습니다.`;
  }

  createLottoHTML() {
    return this.lottos
      .map(({ numbers }) => {
        return `<span data-test="lotto" class="mx-1 text-4xl d-flex items-center justify-center">🎟️ ${
          this.isToggled
            ? `<span data-test="lotto-numbers" class="text-2xl ml-4">${numbers.join(
                ', ',
              )}</span>`
            : ''
        }</span>`;
      })
      .join('');
  }

  setState({ lottos, isToggled }) {
    this.lottos = lottos ?? this.lottos;
    this.isToggled = isToggled ?? this.isToggled;

    this.render();
  }

  render() {
    if (this.lottos.length) {
      this.$target.classList.remove('hidden');
    } else {
      this.$target.classList.add('hidden');
    }
    this.$lottoCount.innerHTML = this.createTotalLottoCountHTML();
    this.$lottoDisplayArea.innerHTML = this.createLottoHTML();
  }
}
