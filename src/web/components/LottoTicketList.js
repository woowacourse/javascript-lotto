import styles from './css/LottoTicketsList.module.css';

class LottoTicketList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <article id="lottoPurchase-article">
    <div id="purchaseHeader-text">총 7개를 구매했습니다.</div>
    <ul id="lotto-list"></ul>
    <div class="purchase-info">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
    <div class="winning-lotto_label">
      <span>당첨 번호</span>
      <span>보너스 번호</span>
    </div>
    <div id="winning-lotto">
      <div id="winning-lotto-inputs" class=${styles.winningLottoNumbersInput}>
        <custom-input width="compact"></custom-input>
        <custom-input width="compact"></custom-input>
        <custom-input width="compact"></custom-input>
        <custom-input width="compact"></custom-input>
        <custom-input width="compact"></custom-input>
        <custom-input width="compact"></custom-input>
      </div>
      <div id="bonus-number">
        <input type="text" maxlength="2" class="lotto-input" />
      </div>
    </div>
    <button id="result-button">결과 확인 하기</button>
  </article>`;
  }
}

customElements.define('lotto-tickets-list', LottoTicketList);
