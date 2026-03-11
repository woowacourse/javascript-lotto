const html = String.raw;

class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = html`
      <div class="footer-container">
        <div class="footer-text-box">Copyright 2023. woowacourse</div>
      </div>
    `;
  }
}

customElements.define("lotto-footer", Footer);
