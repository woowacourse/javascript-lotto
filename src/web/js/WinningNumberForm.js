import { LOTTO, BONUS } from '../../constants';
import { $, $$ } from './utils/dom';

class WinningNumberForm {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
  }

  init() {
    $$('.winning-number').forEach((element) => {
      element.value = '';
    });
    $('.bonus-number').value = '';
  }

  render() {
    this.$target.innerHTML = this.generateNumbertemplate();
  }

  generateNumbertemplate() {
    return String.raw`<form class="winning-bonus-number-form">
        <h4 class="lotto-message input-winning-bonus">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</h4>
        <div class="number-container">
        ${this.generateNumberSection('당첨 번호', 'winning-number')}
        ${this.generateNumberSection('보너스 번호', 'bonus-number')}
        </div>
        <button type="submit" class="check-result-btn">결과 확인하기</button>
      </form>`;
  }

  generateNumberSection(title, className) {
    const count = title === '당첨 번호' ? LOTTO.SIZE : BONUS.SIZE;
    return `
      <div class="${className}-box">
        <h4 class="lotto-message number-margin">${title}</h4>
        ${this.generateInputFields(count, className)}
      </div>
    `;
  }

  generateInputFields(count, className) {
    return Array.from(
      { length: count },
      () => `<input type="number" class="${className}" min="1" max="45" required />`,
    ).join('\n');
  }

  openWinningNumberForm() {
    $('.winning-number-section').style.visibility = 'visible';
  }

  closeWinningNumberForm() {
    $('.winning-number-section').style.visibility = 'hidden';
  }
}

export default WinningNumberForm;
