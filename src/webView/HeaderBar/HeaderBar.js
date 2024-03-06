import BaseComponent from '../BaseComponent/BaseComponent';

class Header extends BaseComponent {
  render() {
    this.outerHTML = `<header>
    <h1 class="header">
      <a href="./">🎱 행운의 로또</a>
    </h1>
  </header>`;
  }
}
customElements.define('header-bar', Header);
