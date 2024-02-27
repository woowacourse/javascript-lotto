export default function purchaseBefore() {
  return `<div class="lp-title">🎱 내 번호 당첨 확인 🎱</div>
    <div class="lp-purchase-amount">
      <div class="lp-pa-text">구입할 금액을 입력해주세요.</div>
      <form class="lp-pa-input-group">
        <input type="number" class="lp-pa-input-amount" id="purchase-amount" placeholder="금액" name="amount" required />
        <button type="submit" class="lp-pa-input-btn">구입</button>
      </form>
    </div>`;
}
