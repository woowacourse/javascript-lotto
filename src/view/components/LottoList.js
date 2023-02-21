import Component from '../../Component.js';

export default class LottoList extends Component {
  template() {
    return `
      <div>총 7개를 구매하였습니다.</div>
      <ul>
        ${this.getLottoList()}
      </ul>
    `;
  }

  getLottoList() {
    const { lottoList } = this.props;

    return lottoList.map((lotto) => `<li>${lotto.getNumbers().join(', ')}</li>`).join('');
  }
}
