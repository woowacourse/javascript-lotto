import NUMBER from '../../constants/number';
import ModalSection from './ModalSection';

const WinNumberSection = {
  createInputUIWinNumber(randomLottos = []) {
    const winNumbersBox = document.querySelector('.winnumber-input-box');
    while (winNumbersBox.firstChild) {
      winNumbersBox.removeChild(winNumbersBox.firstChild);
    }
    const form = this.createWinNumberInputBox();
    winNumbersBox.appendChild(form);
    form.addEventListener('submit', (event) => ModalSection.addResultButton(event, randomLottos));
  },

  createWinNumberInputBox() {
    const form = document.createElement('form');
    form.className = 'winnumber-form';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'winnumber-title';
    titleDiv.textContent = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.';

    const inputBoxDiv = document.createElement('div');
    inputBoxDiv.className = 'input-box';
    inputBoxDiv.append(this.createWinNumberInput(), this.createBonusNumber());

    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error error-message';

    const submitInput = document.createElement('input');
    submitInput.className = 'result-button button';
    submitInput.type = 'submit';
    submitInput.value = '결과를 확인하기';
    form.append(titleDiv, inputBoxDiv, errorDiv, submitInput);
    return form;
  },

  createWinNumberInput() {
    const div = document.createElement('div');
    const labelDiv = document.createElement('div');
    labelDiv.textContent = '당첨 번호';
    div.appendChild(labelDiv);

    for (let i = 0; i < NUMBER.LOTTO_LENGTH; i += 1) {
      const input = document.createElement('input');
      input.className = 'winnumber-input one-number-input';
      input.type = 'text';
      div.appendChild(input);
    }

    return div;
  },

  createBonusNumber() {
    const div = document.createElement('div');
    const labelDiv = document.createElement('div');
    labelDiv.textContent = '보너스 번호';
    div.appendChild(labelDiv);

    const input = document.createElement('input');
    input.className = 'bonusnumber-input one-number-input';
    input.type = 'text';
    div.appendChild(input);

    return div;
  },
};

export default WinNumberSection;
