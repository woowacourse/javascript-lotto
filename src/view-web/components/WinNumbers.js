import Component from './Component.js';
import { qs } from '../../utils/domHelper.js';

export default class WinNumbers extends Component {
  setter;
  drawingNumbersSetter;

  constructor(setter, drawingNumbersSetter) {
    super(qs('#input-winning-number-form'));
    this.setter = setter;
    this.drawingNumbersSetter = drawingNumbersSetter;

    this.addEvent('submit', this.submitDrawingNumbers.bind(this));
  }

  template() {
    return `
    <div><span>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</span></div>
    <div>
      <span>당첨 번호</span>
      <span>보너스 번호</span>
    </div>
      <div id="input-winning-number-container">
        <div id="input-winning-number-items">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      <div id="input-bonus-number-items">
        <input type="text" />
      </div>
    </div>
    <button>결과 확인하기</button>
    `;
  }

  submitDrawingNumbers(event) {
    event.preventDefault();

    const drawingNumbers = {};

    drawingNumbers.winningNumbers = [...event.target]
      .slice(0, 6)
      .map((input) => Number(input.value));
    drawingNumbers.bonusNumber = Number([...event.target][6].value);

    this.setter({ lottoList: this.drawingNumbersSetter(drawingNumbers) });
  }
}
