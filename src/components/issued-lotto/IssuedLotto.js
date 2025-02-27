import BaseWebComponent from "../base/BaseWebComponent.js";
import "./issued-lotto.css";

class IssuedLotto extends BaseWebComponent {
  getTemplate() {
    return `
      <section class="issued-lotto">
        <p class="issued-lotto__description">총 7개를 구매하였습니다.</p>
        <ul class="issued-lotto__list">
          <li class="issued-lotto__item">
            <span class="issued_lotto__icon">🎟️</span>
            <span class="issued-lotto__numbers">12, 28, 22, 37, 19, 23</span>
          </li>
        </ul>
      </section>
    `;
  }
}

customElements.define("issued-lotto", IssuedLotto);
