const html = String.raw;

class Lottos extends HTMLElement {
  set lottoList(value) {
    this._lottoList = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const lottos = this._lottoList?.getLottoList() ?? [];
    const count = lottos.length;

    this.innerHTML = html`
      <div class="lottos-container">
        <div class="lottos-container-header">
          총 ${count}개를 구매하셨습니다. <br />
          (로또 수가 많은 경우 스크롤을 내리세요.)
        </div>
        <div class="lottos-table">
          ${lottos
            .map(
              (lotto) =>
                html`<div class="lotto-line">
                  <div class="lotto-line-icon">🎟️</div>
                  ${lotto.getNumbers().join(", ")}
                </div>`
            )
            .join("")}
        </div>
      </div>
    `;
  }
}

customElements.define("lotto-lottos", Lottos);
