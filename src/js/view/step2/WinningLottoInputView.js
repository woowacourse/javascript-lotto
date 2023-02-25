import { VALUES } from '../../constants/values';

const WINNING_NUMBER_INPUT = `<input type="number" class="winning-number-winning-input" min="1" max="45" maxlength="2" required />`;

const WINNING_NUMBER_TEMPLATE = `
  <form id="winning-number-form">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div id="winning-number-box">
      <div id="winning-number-winning">
        <p>당첨 번호</p>
        <div id="winning-input-box">
          ${WINNING_NUMBER_INPUT.repeat(VALUES.WINNING_NUMBER_COUNT)}
        </div>
      </div>
      <div id="winning-number-bonus">
        <div id="bonus-input-box">
          <p>보너스 번호</p>
          <input id="winning-number-bonus-input" type="number" min="1" max="45" maxlength="2" required />
        </div>
      </div>
    </div>
    <button id="winning-number-button">결과 확인하기</button>
  </form>
`;

class WinningLottoInputView {
  constructor() {
    this.container = document.getElementById('winning-number-container');
  }

  render() {
    this.reset();
    this.container.insertAdjacentHTML('beforeend', WINNING_NUMBER_TEMPLATE);
    this.getFormTag();
    this.winningNumberInput[0].focus();
  }

  reset() {
    this.container.replaceChildren();
  }

  getFormTag() {
    this.form = document.getElementById('winning-number-form');
    this.winningNumberInput = document.getElementsByClassName('winning-number-winning-input');
    this.bonusNumberInput = document.getElementById('winning-number-bonus-input');
  }

  resetValue(valueArr) {
    valueArr[0].focus();

    this.bonusNumberInput.value = '';

    valueArr.forEach(el => {
      el.value = '';
    });
  }

  setDisableButton(valueArr) {
    this.resetValue(valueArr);

    valueArr.forEach(el => {
      el.disabled = true;
    });

    this.bonusNumberInput.disabled = true;

    const resultButton = document.getElementById('winning-number-button');

    resultButton.disabled = true;
    resultButton.style.background = '#8b8b8b';
  }
}

export default WinningLottoInputView;
