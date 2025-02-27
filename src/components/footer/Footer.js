import BaseWebComponent from "../base/BaseWebComponent.js";
import "./footer.css";

class Footer extends BaseWebComponent {
  getTemplate() {
    return `<footer>Copyright 2023. woowacourse</footer>`;
  }
}

customElements.define("lotto-footer", Footer);
