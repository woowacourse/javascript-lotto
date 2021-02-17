import { $ } from '../utils/dom.js';

export default class LottoDisplay {
  constructor(props) {
    this.props = props;
    this.lottos = this.props.lottos;
    this.isToggle = false;
    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$target = $('#lotto-display-container');
    this.$toggleButton = $('.lotto-numbers-toggle-button');
  }

  setState({ lottos, isToggle }) {
    this.lottos = lottos ?? this.lottos;
    this.isToggle = isToggle ?? this.isToggle;
    this.render();
  }

  bindEvent() {
    this.$toggleButton.addEventListener(
      'change',
      this.toggleButtonClickHandler.bind(this),
    );
  }

  toggleButtonClickHandler() {
    this.setState({ isToggle: !this.isToggle });
  }

  createLottoHtml() {
    let template = this.lottos
      .map(({ numbers }) => {
        return `<span data-test="lotto" class="mx-1 text-4xl">🎟️ ${
          this.isToggle
            ? `<span data-test="lotto-numbers">${numbers.join(', ')}</span>`
            : ''
        }</span>`;
      })
      .join('');
    return template;
  }

  render() {
    this.$target.innerHTML = this.createLottoHtml();
  }
}
