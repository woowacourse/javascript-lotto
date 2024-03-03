export default function generatePurchaseInputHTML() {
  return `<h1 class="lp-title">🎱 내 번호 당첨 확인 🎱</h1>
    <div class="lp-purchase-amount">
      <label class="lp-pa-text" for="purchase-amount">구입할 금액을 입력해주세요.</label>
      <form class="lp-pa-input-group" id="purchase-input-group">
        <input type="number" class="lp-pa-input-amount" id="purchase-amount" placeholder="금액" min="1000" max="100000" autofocus required />
        <button class="lp-pa-input-btn default-button"
        id="purchase-input-btn">구입</button>
      </form>
    </div>`;
}
