import Component from '../abstracts/component';
import lottoImage from '../../../images/lotto.png';

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
    return `
      <label>총 ${lottoList.length}개를 구매하였습니다.</label>
      <img src="${lottoImage}" alt="lotto"></img>
    `;
  }
}

customElements.define('lotto-list', LottoList);

export default LottoList;
