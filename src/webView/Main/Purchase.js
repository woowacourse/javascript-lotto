const html = String.raw;

class Purchase extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = html` <div class="card-input-container">
      <label class="input-label" for="purchase-amount">
        구입할 금액을 입력해주세요.
      </label>
      <form class="input-container">
        <input class="input-line" id="purchase-amount" placeholder="금액" />
        <button class="input-button">구입</button>
      </form>
    </div>`;

    this.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      const purchase = this.querySelector(".input-line").value;

      this.dispatchEvent(
        new CustomEvent("purchase", {
          detail: { purchase },
          bubbles: true,
        })
      );
    });
  }
}

customElements.define("lotto-purchase", Purchase);
