import Component from "./Component.js";

export default class LottoList extends Component {
  template() {
    return `
    <section class="lotto-detail-layout">
          <span class="lotto-detail-title body">총 ${
            this.props.lottoList.length
          }개를 구매하였습니다.</span>
          <div class="lotto-detail-list">
            <div class="lotto-detail-item body">
              ${this.props.lottoList
                .map((lotto) => {
                  return `
              <span class="lotto-detail-item-number"
                ><img src="/src/assets/ic_admit_one.png" />${lotto.numbers.join(
                  ", "
                )}</span
              >
              `;
                })
                .join("")}
            </div>
          </div>
        </section>
    `;
  }
}
