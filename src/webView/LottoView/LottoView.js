const html = String.raw;

export default class LottoView {
  constructor() {
    this.$purchaseForm = document.querySelector("#purchase-form");
    this.$purchaseAmount = document.querySelector("#purchase-amount");

    this.$lottoSection = document.querySelector("#lotto-section");
    this.$purchaseSummary = document.querySelector("#purchase-summary");
    this.$ticketContainer = document.querySelector("#ticket-container");
  }

  renderLottos(lottos) {
    this.$purchaseSummary.textContent = `총 ${lottos.length}개를 구매했습니다. (로또 수가 많은 경우 스크롤을 내리세요.)`;

    const ticketsHtml = lottos
      .map(
        (lotto) =>
          html`
            <div class="lotto-line">
              <div class="lotto-line-icon">🎟️</div>
              ${lotto.getNumbers().join(", ")}
            </div>
          `
      )
      .join("");

    this.$ticketContainer.innerHTML = ticketsHtml;
  }
  open() {
    this.$lottoSection.hidden = false;
  }
  close() {
    this.$lottoSection.hidden = true;
  }
}
