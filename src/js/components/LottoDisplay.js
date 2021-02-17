import { $ } from '../utils/dom.js';

export default class LottoDisplay {
  constructor(props) {
    this.props = props;
    this.lottoCount = this.props.lottoCount;
    this.selectDOM();
  }

  selectDOM() {
    this.$target = $('#lotto-display-container');
  }

  setState({ lottoCount }) {
    this.lottoCount = lottoCount;
    this.render();
  }

  createLottoHtml() {
    return `<span data-test="lotto" class="mx-1 text-4xl">🎟️ </span>`;
  }

  render() {
    this.$target.innerHTML = this.createLottoHtml().repeat(this.lottoCount);
  }
}
