const html = String.raw;

class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = html`
      <div class="header-container">
        <div class="header-text-box">🎱 행운의 로또</div>
      </div>
    `;
  }
}

customElements.define("lotto-header", Header);
