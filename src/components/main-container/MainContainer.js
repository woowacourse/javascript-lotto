import { CUSTOM_ELEMENTS } from "../../constants/customElements.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import { hideElement } from "../../utils/domUtils.js";
import "./main-container.css";

class MainContainer extends BaseWebComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <main>
        <lotto-purchase></lotto-purchase>
        <issued-lotto></issued-lotto>
        <winning-lotto></winning-lotto>
        <lotto-result></lotto-result>
      </main>
    `;
  }

  reset() {
    this.render();
    this.initComponents();
  }

  initComponents() {
    const issuedLotto = this.querySelector(CUSTOM_ELEMENTS.issuedLotto);
    const winningLotto = this.querySelector(CUSTOM_ELEMENTS.winningLotto);

    hideElement(issuedLotto);
    hideElement(winningLotto);
  }
}

customElements.define(CUSTOM_ELEMENTS.mainContainer, MainContainer);
