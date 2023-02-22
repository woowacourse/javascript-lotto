import Component from '../../Component.js';

export default class WinNumbers extends Component {
  setEvent() {
    this.addEvent('submit', '.lotto-store__win-numbers-form', this.handleSubmitForm.bind(this));
  }

  template() {
    return `
      <div class='lotto-store__win-numbers-desc'>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
      <form class='lotto-store__win-numbers-form'>
        <div class='lotto-store__drawing-numbers'>
          <div class='lotto-store__win-numbers-input-box'>
            <label class='lotto-store__win-numbers-label'>당첨 번호</label>
            <ul class='lotto-store__win-numbers-list'>
              ${this.getWinNumbersInputTemplate(6)}
            </ul>
          </div>
          <div class='lotto-store__bonus-number-input-box'>
            <label class='lotto-store__bonus-number-label'>보너스 번호</label>
            <input name='bonus-number-input' type='number' min=1 max=4/>
          </div>
        </div>
        <button class='lotto-store__draw-btn' type='submit'>결과 확인하기</button>
      </form>
    `;
  }

  getWinNumbersInputTemplate(number = 1) {
    return Array(number)
      .fill()
      .map(
        (_, i) => `
          <li class='lotto-store__win-number-list'>
            <input name='win-number-input-${i}' type='number' min=1 max=4/>
          </li>`
      )
      .join('');
  }

  handleSubmitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = Object.fromEntries(formData);
    const drawingNumbers = { winNumbers: [], bonusNumber: 0 };

    Object.entries(fields).forEach(([name, value]) => {
      if (name.includes('win-number')) drawingNumbers.winNumbers.push(Number(value));
      if (name.includes('bonus-number')) drawingNumbers.bonusNumber = Number(value);
    });

    this.props.updateDrawingNumbers(drawingNumbers);
    this.props.openModal();
  }
}
