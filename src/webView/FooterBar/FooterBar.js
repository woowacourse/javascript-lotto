import BaseComponent from '../BaseComponent/BaseComponent';

class FooterBar extends BaseComponent {
  render() {
    this.outerHTML = `<footer class="footer">
    <div class="footer-content text-lotto-caption">copyright 2023. woowacourse</div>
    </footer>`;
  }

  setEvent() {}
}
customElements.define('footer-bar', FooterBar);
