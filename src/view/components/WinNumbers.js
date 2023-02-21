import Component from '../../Component.js';
import { createEl } from '../../utils/domHelper.js';

export default class WinNumbers extends Component {
  template() {
    return `
      <div>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
      <form class='winNumbers-form'>
        <div>
          <label>당첨 번호</label>
          ${this.getNumberInput('winNumber', 6)}
        <div>
        <div>
          <label>보너스 번호</label>
          ${this.getNumberInput('bonusNumber')}
        <div>
        <button type='submit'>결과 확인하기</button>
      </form>
    `;
  }

  getNumberInput(type, number = 1) {
    return Array(number)
      .fill()
      .map(
        (_, i) =>
          createEl('input', {
            class: `${type}-input-${i}`,
            style: { width: '30px' },
            attributes: {
              name: `${type}-input-${i}`,
              type: 'number',
              min: 1,
              max: 45,
            },
          }).outerHTML
      )
      .join('');
  }
}
