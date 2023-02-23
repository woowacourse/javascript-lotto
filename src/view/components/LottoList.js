import Component from '../../Component.js';

export default class LottoList extends Component {
  template() {
    return `
      <div class='lotto-list__lotto-amount'>
        총 ${this.props.lottoList.length}개를 구매하였습니다.
      </div>
      <ul class='lotto-list__lotto-list'>
        ${this.getLottoList()}
      </ul>
    `;
  }

  getLottoListTemplate() {
    const { lottoList } = this.props;

    return lottoList
      .map(
        (lotto) =>
          `<li class='lotto-list__lotto'> <span>🎟</span> ${lotto.getNumbers().join(', ')}</li>`
      )
      .join('');
  }
}
