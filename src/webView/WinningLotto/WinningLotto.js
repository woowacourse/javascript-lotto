import BaseComponent from '../BaseComponent/BaseComponent';

class WinningLotto extends BaseComponent {
  render() {
    this.outerHTML = `<div class="winning-lotto hidden">
    <label class="winning-lotto__label text-lotto-body"
      >지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label
    >
    <div class="winning-lotto-form">
      <div class="winning-numbers">
        <label class="winning-numbers__label text-lotto-body">당첨 번호</label>
        <div class="winning-numbers-inputs">
          <input class="winning-numbers-inputs__input text-lotto-body" />
          <input class="winning-numbers-inputs__input text-lotto-body" />
          <input class="winning-numbers-inputs__input text-lotto-body" />
          <input class="winning-numbers-inputs__input text-lotto-body" />
          <input class="winning-numbers-inputs__input text-lotto-body" />
          <input class="winning-numbers-inputs__input text-lotto-body" />
        </div>
      </div>
      <div class="bonus-number">
        <label class="bonus-number__label text-lotto-body">보너스 번호</label>
        <div class="bonus-number-inputs"><input class="bonus-number-inputs__input" /></div>
      </div>
    </div>
  </div>`;
  }

  setEvent() {}
}
customElements.define('winning-lotto', WinningLotto);
