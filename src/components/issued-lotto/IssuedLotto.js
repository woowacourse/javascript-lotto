import { CUSTOM_ELEMENTS, STYLE_SELECTORS } from "../../constants/constants.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./issued-lotto.css";

class IssuedLotto extends BaseWebComponent {
  constructor() {
    super();
    this.lottos = [];
  }

  getTemplate() {
    return `
      <section class="issued-lotto ${STYLE_SELECTORS.hidden}">
        <p class="issued-lotto__description">총 ${this.lottos.length}개를 구매하였습니다.</p>
        <ul class="issued-lotto__list">
          ${this.lottos
            .map(
              (lotto) => `
            <li class="issued-lotto__item">
              <span class="issued_lotto__icon">🎟️</span>
              <span class="issued-lotto__numbers">${lotto.join(", ")}</span>
            </li>
            `,
            )
            .join("")}
        </ul>
      </section>
    `;
  }

  updateLottos(lottos) {
    this.lottos = lottos;
    this.render();
  }
}

customElements.define(CUSTOM_ELEMENTS.issuedLotto, IssuedLotto);
