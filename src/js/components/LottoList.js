import Component from '../abstracts/component';
import LottoImage from '../../../images/lotto.png';

class LottoList extends Component {
  connectedCallback() {
    this.render();
    this.subscribe();
  }

  render() {
    const { money, lottoList, lottoListVisibility } = window.store.getState();
    this.innerHTML = this.template(lottoListVisibility, lottoList);
    if (money > 0) {
      this.show();
    }
  }

  // eslint-disable-next-line max-lines-per-function
  template(lottoListVisibility, lottoList) {
    const image = `<img src="${LottoImage}" alt="lotto"></img>`;
    const lists = lottoListVisibility
      ? lottoList
          .map((lottoNums) => `<lotto-item data-lotto-nums="${lottoNums.join(', ')}"></lotto-item>`)
          .join('')
      : '';

    return `
      <article>
        <label>총 ${lottoList.length}개를 구매하였습니다.</label>
        <div>${image.repeat(lottoList.length)}</div>
        <lotto-list-toggle></lotto-list-toggle>
      </article>
      <ul>${lists}</ul>
    `;
  }
}

customElements.define('lotto-list', LottoList);

export default LottoList;
