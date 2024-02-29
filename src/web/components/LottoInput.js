class LottoInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
 <div class="lotto-input">
    <div>구입할 금액을 입력해주세요.</div>
    <form id="lotto-form">
      <input id="purchaseAmount-input" type="text" placeholder="금액" />
      <custom-button width="compact">구입</custom-button>
    </form>
  </div> 
        `;
  }
}

customElements.define('lotto-input', LottoInput);
