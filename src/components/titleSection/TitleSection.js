import Component from '../Component';

class TitleSection extends Component {
  render() {
    this.innerHTML = `
    <div class='title'>🎱 내 번호 당첨 확인 🎱</div>`;
  }
}

customElements.define('title-section', TitleSection);
