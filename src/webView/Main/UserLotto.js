const html = String.raw;

class UserLotto extends HTMLElement {
  static get observedAttributes() {
    return ["error"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const error = this.getAttribute("error") || "";

    this.innerHTML = html`
      <form class="userLotto-container">
            <label class="userLotto-header" for="winningNumber">
              지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
            </label>
            <div class="input-container">
              <!-- 당첨 번호 -->
              <div class="winningNumber-container">
                <label
                  class="winningNumber-container-header"
                  for="winningNumber"
                >
                  당첨 번호
                </label>
                <div class="winningNumber-input-container">
                  <input
                    type="text"
                    id="winningNumber"
                    class="winningNumber-line"
                  />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                  <input type="text" class="winningNumber-line" />
                </div>
              </div>
              <div class="bonusNumber-container">
                <label class="bonusNumber-container-header" for="bonusNumber">
                  보너스 번호
                </label>

                <input type="text" id="bonusNumber" class="bonusNumber-line" />
              </div>
            </div>
          </div>

          <a class="input-error" ${error ? "" : "hidden"}>${error}</a>

          <!-- 결과 확인하기 버튼 -->
          <button class="result-button">결과 확인하기</button>
        </form>
    `;

    this.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      const numbers = Array.from(this.querySelectorAll(".winningNumber-line"))
        .map((el) => el.value.trim())
        .filter((v) => v !== "")
        .map((v) => Number(v));

      const winningNumber = numbers;
      const bonusNumber = Number(this.querySelector(".bonusNumber-line").value);

      this.dispatchEvent(
        new CustomEvent("result", {
          detail: { winningNumber, bonusNumber },
          bubbles: true,
        })
      );
    });
  }
}

customElements.define("lotto-user-lotto", UserLotto);
