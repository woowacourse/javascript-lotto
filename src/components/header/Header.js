import { CUSTOM_ELEMENTS } from "../../constants/constants.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./header.css";

class Header extends BaseWebComponent {
  getTemplate() {
    return `
      <header class="lotto-header">
        <h2 class="lotto-header__title">🎱 행운의 로또</h2>
      </header>
    `;
  }
}

customElements.define(CUSTOM_ELEMENTS.lottoHeader, Header);
