const template = {
  paymentSection: `
  <section id="payment-section">
    <h2 hidden>구입할 금액</h2>
    <label for="payment-input">구입할 금액을 입력해주세요.</label>
    <form class="payment-form">
      <input name="payment-input" id="payment-input" type="number" placeholder="금액" />
      <button id="payment-button">구입</button>
    </form>
  </section>
  `,
  purchasedSection(lottoList) {
    return `
    <section id="purchased-lotto-list-section">
      <h2 hidden>구입한 로또 목록</h2>
      <div class="lotto-list-container">
        <p class="purchased-total-count">총 ${
          lottoList.length
        }개를 구매하였습니다.</p>
        <ul id="lotto-list">
          ${lottoList.map((lotto) => this.lottoLi(lotto)).join('')}
        </ul>
      </div>
      <div class="lotto-list-toggle-container">
        <p>번호 보기</p>
        <button id="lotto-list-toggle-button"></button>
      </div>
    </section>
    `;
  },
  lottoLi(lotto) {
    return `
    <li class="lotto">
      <p class="lotto-ticket">🎟️</p>
      <p class="lotto-number invisible">${lotto.join(', ')}</p>
    </li>
    `;
  },
};

export default template;
