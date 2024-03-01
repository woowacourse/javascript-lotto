import MyComponent from "../abstract/MyComponent.js";

export default class BoughtLottoBoard extends MyComponent {
  #lottosState;

  constructor(targetElementId, lottosState) {
    super(targetElementId);

    this.#lottosState = lottosState;
  }

  _getTemplate() {
    const lottos = this.#lottosState.getState();

    return `
<section class="showing-bought-lottos">
  ${this.#getLottoCountTemplate(lottos.length)}
  ${lottos.map((lotto) => this.#getBoughtLottoTemplate(lotto)).join("")}
</section>
    `;
  }

  #getLottoCountTemplate(lottoCount) {
    const BLANK = "";

    return lottoCount
      ? `<p class="bought-message body-text">총 ${lottoCount}개를 구매했습니다.</p>`
      : BLANK;
  }

  #getBoughtLottoTemplate(lotto) {
    return `
<div class="bought-lotto-line flex-box">
  <span class="lotto-icon">🎟️</span>
  <div class="body-text">${lotto.getNumbers().join(", ")}</div>
</div>
      `;
  }
}
