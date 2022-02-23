import Component from '../abstracts/component';
import LottoImage from '../../../images/lotto.png';

class LottoList extends Component {
  connectedCallback() {
    this.render();
    this.subscribe();
  }

  render() {
    const { lottoList } = window.store.getState();
    this.innerHTML = this.template(lottoList);
  }

  template(lottoList) {
    const image = `<img src="${LottoImage}" alt="lotto"></img>`;
    const lists = lottoList
      .map((lottoNums) => `<lotto-item data-lotto-nums="${lottoNums.join(', ')}"></lotto-item>`)
      .join('');

    return `
      <article>
        <label>총 ${lottoList.length}개를 구매하였습니다.</label>
        <div>${image.repeat(lottoList.length)}</div>
      </article>
      <ul>${lists}</ul>
    `;
  }
}

customElements.define('lotto-list', LottoList);

export default LottoList;
