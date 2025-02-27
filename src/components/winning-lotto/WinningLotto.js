import BaseWebComponent from "../base/BaseWebComponent.js";
import "./winning-lotto.css";
class WinningLotto extends BaseWebComponent {
  getTemplate() {
    return `
      <section class="winning-lotto">
        <p class="winning-lotto__description">
          지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
        </p>
        <p class="winning-lotto__numbers">
          <span>당첨 번호</span><span>보너스 번호</span>
        </p>
        <form class="winning-lotto__form">
          <div class="winning-lotto__inputs">
            <div class="winning-lotto__winning-numbers">
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
            </div>
            <div class="winning-lotto__bonus-number">
              <input
                class="winning-lotto__input"
                min="1"
                max="45"
                type="number"
              />
            </div>
          </div>
          <button class="winning-lotto__result-button">결과 확인하기</button>
        </form>
      </section>
      `;
  }
}

customElements.define("winning-lotto", WinningLotto);
