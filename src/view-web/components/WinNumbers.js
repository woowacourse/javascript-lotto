import Component from './Component.js';
import { getId } from '../../utils/domHelper.js';

export default class WinNumbers extends Component {
  setter;
  lottoList;
  render;

  constructor(setter, lottoList, render) {
    super(getId('input-winning-number-form'));
    this.setter = setter;
    this.lottoList = lottoList;
    this.render = render;

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
          <input type="number" min="1" max="45" required/>
          <input type="number" min="1" max="45" required/>
          <input type="number" min="1" max="45" required/>
          <input type="number" min="1" max="45" required/>
          <input type="number" min="1" max="45" required/>
          <input type="number" min="1" max="45" required/>
        </div>
      <div id="input-bonus-number-items">
        <input type="number" min="1" max="45" required/>
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

    this.setter({ lottoList: this.setDrawingNumbers(drawingNumbers) });

    this.render();
    this.activateModal();
  }

  setDrawingNumbers(drawingNumbers) {
    const lottoList = this.lottoList.map((lotto) => {
      lotto.setDrawingNumbers(drawingNumbers);
      return lotto;
    });
    return lottoList;
  }

  activateModal() {
    getId('lotto-statistics-modal').showModal();
  }
}
