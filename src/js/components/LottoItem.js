import Component from '../abstracts/component';
import LottoImage from '../../../images/lotto.png';
import { LOTTO_BALL_COLORS } from '../constants';
import { toInt } from '../utils';

class LottoItem extends Component {
  constructor() {
    super();
    this.lottoNums = this.getAttribute('data-lotto-nums').split(',');
    this.rank = toInt(this.getAttribute('data-rank'), 0);
  }

  template(lottoNums, rank) {
    const numTemplate = lottoNums
      .map((num) => `<span class="lotto-ball ${LOTTO_BALL_COLORS[num]}">${num}</span>`)
      .join('');
    const rankTemplate = `<span class="rank">🏆 ${rank}등 당첨!</span>`;
    return `
      <img src=${LottoImage} />
      ${numTemplate}
      ${this.rank > 0 ? rankTemplate : ''}
    `;
  }

  shouldSubscribe() {
    return false;
  }

  render() {
    this.innerHTML = this.template(this.lottoNums, this.rank);
  }
}

customElements.define('lotto-item', LottoItem);

export default LottoItem;
